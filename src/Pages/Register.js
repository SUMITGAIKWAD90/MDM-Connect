import { createUserWithEmailAndPassword, deleteUser, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import PageLayout from '../components/PageLayout';
import RegistrationSuccessCard from '../components/registration/RegistrationSuccessCard';
import SchoolRegistrationForm from '../components/registration/SchoolRegistrationForm';
import { initialRegistrationData } from '../components/registration/constants';
import { auth, db } from '../firebase';

const Register = () => {
  const [formData, setFormData] = useState(initialRegistrationData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (formData.password.length >= 8) score += 1;
    if (/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password)) score += 1;
    if (/\d/.test(formData.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) score += 1;
    return score;
  }, [formData.password]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!/^\d{11}$/.test(formData.udiseCode)) nextErrors.udiseCode = 'UDISE code must be 11 digits.';
    if (!formData.schoolName.trim()) nextErrors.schoolName = 'School name is required.';
    if (!formData.state) nextErrors.state = 'State is required.';
    if (!formData.district.trim()) nextErrors.district = 'District is required.';
    if (!formData.city.trim()) nextErrors.city = 'City is required.';
    if (!formData.townVillage.trim()) nextErrors.townVillage = 'Town/Village is required.';
    if (!/^\d{6}$/.test(formData.pincode)) nextErrors.pincode = 'Pincode must be 6 digits.';
    if (!formData.headName.trim()) nextErrors.headName = 'Head master name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) nextErrors.schoolEmail = 'Enter a valid school email.';

    if (formData.password.length < 8) {
      nextErrors.password = 'Password must contain at least 8 characters.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      nextErrors.password = 'Use uppercase, lowercase and a number in password.';
    }

    if (formData.confirmPassword !== formData.password) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.agreeTerms) nextErrors.agreeTerms = 'You must accept terms and conditions.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const credential = await createUserWithEmailAndPassword(auth, formData.schoolEmail, formData.password);

      try {
        await setDoc(doc(db, 'schools', credential.user.uid), {
          udiseCode: formData.udiseCode,
          schoolName: formData.schoolName,
          state: formData.state,
          district: formData.district,
          city: formData.city,
          townVillage: formData.townVillage,
          pincode: formData.pincode,
          headName: formData.headName,
          schoolEmail: formData.schoolEmail,
          role: 'school',
          createdAt: new Date().toISOString(),
        });
      } catch (profileError) {
        // Keep auth/profile consistent if profile write fails.
        await deleteUser(credential.user).catch(() => {});
        throw profileError;
      }

      await signOut(auth);
      setIsSuccess(true);
    } catch (submitError) {
      if (submitError.code === 'auth/email-already-in-use') {
        setErrors({ submit: 'This email is already registered. Please login.' });
      } else if (submitError.code === 'auth/invalid-email') {
        setErrors({ submit: 'Invalid email format.' });
      } else if (submitError.code === 'auth/weak-password') {
        setErrors({ submit: 'Password must be at least 6 characters in Firebase.' });
      } else if (submitError.code === 'auth/operation-not-allowed') {
        setErrors({ submit: 'Email/password sign-in is disabled in Firebase Authentication.' });
      } else if (submitError.code === 'permission-denied') {
        setErrors({ submit: 'Firebase rule denied school profile write. Update Firestore rules and retry.' });
      } else {
        setErrors({ submit: submitError?.message || 'Registration failed. Please verify details and try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      {isSuccess ? (
        <RegistrationSuccessCard udiseCode={formData.udiseCode} />
      ) : (
        <SchoolRegistrationForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          passwordStrength={passwordStrength}
          isSubmitting={isSubmitting}
        />
      )}
    </PageLayout>
  );
};

export default Register;

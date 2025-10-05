import SchoolHeader from '../components/SchoolHeader';
import Guidelines from '../components/Guidelines';
import Footer from '../components/Footer';

const Schooldashboard = () => {
  const schoolName = "Zila Parishad School Wagholi"; 

  return (
    <div className="min-h-screen ">
      <SchoolHeader schoolName={schoolName} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold">Welcome to School Dashboard</h2>
        <p>This is test content</p>
      </main>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Guidelines />
      </main>

      <Footer />
    </div>
  );
};

export default Schooldashboard;
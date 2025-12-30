//src/features/common/Home.jsx
import Header from './Header';
import './Home.css';

const Home = () => {
  return (
    <>
      <Header />
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>מתכונים חדשים</h1>
        <p>(כאן יבוא קרוסלה או רשימה של מתכונים אחרונים – נוסיף בהמשך)</p>
      </div>
    </>
  );
};

export default Home;
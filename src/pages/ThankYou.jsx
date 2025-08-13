import { useNavigate } from 'react-router-dom';
import GlowingButton from '../components/GlowingButton';
import FancyButton from '../components/FancyButton';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1587725943749-3d475c15c983?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff'
      }}
    >
      {/* Thank You Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
        Thank You for Your Order!
      </h1>

      {/* Short description */}
      <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
        We appreciate your trust in GenZWear. Your order is being processed and will be on its way soon.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <GlowingButton
          label="View Your Orders"
          onClick={() => navigate('/Orders')}
        />
        <FancyButton
          label="Continue Shopping"
          onClick={() => navigate('/products')}
        />
      </div>
    </div>
  );
}

export default ThankYou;

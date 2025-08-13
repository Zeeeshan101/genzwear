function Footer() {
  return (
    <footer className="bg-black text-white text-center py-4 mt-10 shadow-inner border-t border-gray-700">
      <p className="text-sm tracking-wide font-light">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-200">GenZ Store</span> — All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;

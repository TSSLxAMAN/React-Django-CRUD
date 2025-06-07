const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-1">
        <div className="flex flex-col text-center">
          <div className="text-sm text-white">
            © `{currentYear}  name`. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
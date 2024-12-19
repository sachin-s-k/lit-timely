const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex justify-between sm:grid-cols-3 gap-2">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="/about" className="hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-blue-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Product Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="/features" className="hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-blue-600">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/integrations" className="hover:text-blue-600">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="/features" className="hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-blue-600">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/integrations" className="hover:text-blue-600">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Follow Us</h3>
            <div className="flex items-center space-x-4 mt-4">
              <a
                data-v-db4b02a6=""
                href="https://twitter.com/gitlab"
                data-ga-name="twitter"
                data-ga-location="footer"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="social__links--icon"
                  data-v-db4b02a6=""
                >
                  <path
                    fill="currentColor"
                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M20 0H4C1.79 0 0 1.79 0 4v16c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zM7.12 20.02H4.02v-10h3.1v10zM5.56 8.94A1.78 1.78 0 113.78 7.1a1.78 1.78 0 011.78 1.84zm13.4 11.08h-3.09v-5.46c0-1.3-.47-2.2-1.65-2.2-.89 0-1.42.61-1.65 1.2-.09.22-.11.53-.11.84v5.62h-3.1v-10h3.1v1.4c.41-.63 1.14-1.53 2.8-1.53 2.05 0 3.59 1.34 3.59 4.22v5.91h-.01z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M7.001 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5.001 5H17c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7.001zm10 2c.556 0 1.063.223 1.414.586.35.362.585.868.585 1.414 0 .556-.223 1.063-.586 1.414A2.002 2.002 0 0117.001 7a2 2 0 010-4zM7 4h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 4a5 5 0 100 10 5 5 0 000-10zm0 2c1.654 0 3 1.346 3 3a3.01 3.01 0 01-3 3 3.01 3.01 0 01-3-3c0-1.654 1.346-3 3-3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
          <p>&copy; 2024 LIT School, Banglore. All rights reserved.</p>
          <p>
            <a href="/terms" className="hover:text-blue-600">
              Terms
            </a>{" "}
            ·{" "}
            <a href="/privacy" className="hover:text-blue-600">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

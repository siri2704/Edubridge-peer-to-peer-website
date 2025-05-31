import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Platform Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/feedback" className="hover:text-gray-900 dark:hover:text-white transition-colors">Feedback</Link></li>
            </ul>
          </div>
          {/* Legal Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EduBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
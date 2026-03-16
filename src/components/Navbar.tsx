import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/intro', label: 'Markdown 介绍' },
  { path: '/guide', label: '语法教学' },
  { path: '/editor', label: '在线编辑器' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gray-900 tracking-tight">
          MD 工具站
        </Link>
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === item.path
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm font-medium border-b border-gray-50 ${
                pathname === item.path
                  ? 'bg-gray-50 text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

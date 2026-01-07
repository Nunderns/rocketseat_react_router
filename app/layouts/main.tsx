import { NavLink, Outlet } from "react-router";

export default function MainLayout() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Cervejaria App</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/cervejarias"
                  className={({ isActive }) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Cervejarias
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
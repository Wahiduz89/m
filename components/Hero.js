export default function Header() {
    return (
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">School Name</div>
          <div className="space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="/admissions" className="text-gray-600 hover:text-blue-600">Admissions</a>
          </div>
        </nav>
      </header>
    )
  }
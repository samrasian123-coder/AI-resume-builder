import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
          <p className="text-gray-500 mt-2">Manage and create your professional resumes.</p>
        </div>
        <Link 
          href="/editor/new"
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          + Create New Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for Resume Cards */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Software Engineer Resume</h3>
            <p className="text-sm text-gray-500 mt-1">Updated 2 days ago</p>
          </div>
          <div className="mt-6 flex gap-3 border-t dark:border-gray-700 pt-4">
            <Link href="/editor/123" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Edit</Link>
            <button className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Download PDF</button>
            <button className="text-sm text-red-600 hover:text-red-700 ml-auto">Delete</button>
          </div>
        </div>
        
        {/* Empty State / Create New Card */}
        <Link 
          href="/editor/new"
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors min-h-[200px]"
        >
          <span className="text-4xl mb-2">+</span>
          <span className="font-medium">Create Blank Resume</span>
        </Link>
      </div>
    </div>
  );
}

import MainLayout from "../layouts/MainLayout";

function IssueDetails() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          📋 Issue Details
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
          <img
            src="https://via.placeholder.com/700x350"
            alt="Issue"
            className="rounded-lg mb-6 w-full"
          />

          <h2 className="text-2xl font-bold mb-4">
            🗑 Overflowing Dustbin
          </h2>

          <p className="mb-3">
            <strong>Priority:</strong>
            <span className="text-red-600"> High</span>
          </p>

          <p className="mb-3">
            <strong>Location:</strong> Block A - Near Library
          </p>

          <p className="mb-5">
            <strong>AI Suggested Action:</strong><br />
            Immediate cleaning is recommended.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
            Mark as Resolved
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default IssueDetails;
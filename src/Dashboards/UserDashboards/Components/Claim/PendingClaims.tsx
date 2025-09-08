import type { Claim } from '../../../../../Utils/PropsInterface';

interface PendingClaimsProps {
  claim: Claim;
  openClaim: (claim: Claim) => void;
  formatDate: (dateString: string) => string;
  getStatus: (claim: Claim) => string;
}

function PendingClaims({ claim, openClaim, formatDate, getStatus }: PendingClaimsProps) {
  return (
    <div
      onClick={() => openClaim(claim)}
      className="p-5 border rounded-xl cursor-pointer hover:border-[#2c4a8a] transition-all duration-200 ease-in-out bg-white shadow-sm hover:shadow-md"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">
            Claim from {claim.user.first_name} {claim.user.last_name}
          </h4>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{claim.message}</p>
          <div className="flex items-center mt-3 flex-wrap gap-2">
            <span className="text-xs text-gray-400">{formatDate(claim.created_at)}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {claim.user.contact_number}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              getStatus(claim) === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {getStatus(claim).charAt(0).toUpperCase() + getStatus(claim).slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PendingClaims;

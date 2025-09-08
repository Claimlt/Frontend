import type { ResolveClaimsProps } from "../../../../../Utils/PropsInterface"


function ResolveClaims({ resolvedClaims, openClaim, formatDate }: ResolveClaimsProps) {
    return (
        <div>
            {resolvedClaims.length > 0 && (
                <>
                    <div className="mt-8 mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Resolved Claims</h4>
                        <p className="text-sm text-gray-500">Previously processed claims</p>
                    </div>

                    {resolvedClaims.map(claim => (
                        <div
                            key={claim.id}
                            onClick={() => openClaim(claim)}
                            className="p-5 border rounded-xl cursor-pointer hover:border-gray-400 transition-all duration-200 ease-in-out bg-gray-50"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 truncate">
                                        Claim from {claim.user.first_name} {claim.user.last_name}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{claim.message}</p>
                                    <div className="flex items-center mt-3 flex-wrap gap-2">
                                        <span className="text-xs text-gray-400">{formatDate(claim.created_at)}</span>
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                            Accepted
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default ResolveClaims
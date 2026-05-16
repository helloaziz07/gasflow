// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title GasflowCertificate
 * @notice ERC-721 NFT contract for minting achievement certificates on Base Sepolia.
 *         Metadata is stored fully on-chain as Base64-encoded JSON.
 *         Designed for gasless minting via UGF (Universal Gas Framework).
 */
contract GasflowCertificate is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;

    struct Certificate {
        string recipientName;
        string title;
        string achievement;
        uint256 mintedAt;
    }

    /// @notice Mapping from token ID to certificate data
    mapping(uint256 => Certificate) public certificates;

    /// @notice Total number of certificates minted
    uint256 public totalMinted;

    /// @notice Emitted when a new certificate is minted
    event CertificateMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string recipientName,
        string title,
        string achievement
    );

    constructor() ERC721("Gasflow Certificate", "GFCERT") Ownable(msg.sender) {}

    /**
     * @notice Mint a new certificate NFT
     * @param recipient The address that will receive the NFT
     * @param recipientName The name displayed on the certificate
     * @param title The certificate title (e.g., "Hackathon Winner")
     * @param achievement The achievement description
     * @return tokenId The ID of the newly minted token
     */
    function mintCertificate(
        address recipient,
        string memory recipientName,
        string memory title,
        string memory achievement
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(recipient, tokenId);

        certificates[tokenId] = Certificate({
            recipientName: recipientName,
            title: title,
            achievement: achievement,
            mintedAt: block.timestamp
        });

        totalMinted++;

        emit CertificateMinted(tokenId, recipient, recipientName, title, achievement);
        return tokenId;
    }

    /**
     * @notice Returns fully on-chain metadata as a Base64-encoded JSON data URI
     * @param tokenId The token ID to get metadata for
     * @return A data:application/json;base64 URI
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        Certificate memory cert = certificates[tokenId];

        // Build SVG image for the certificate
        string memory svg = _generateSVG(cert, tokenId);
        string memory svgBase64 = Base64.encode(bytes(svg));

        // Build JSON metadata
        string memory json = string(
            abi.encodePacked(
                '{"name":"', cert.title, " #", tokenId.toString(), '",',
                '"description":"Certificate awarded to ', cert.recipientName,
                " for: ", cert.achievement, '",',
                '"image":"data:image/svg+xml;base64,', svgBase64, '",',
                '"attributes":[',
                '{"trait_type":"Recipient","value":"', cert.recipientName, '"},',
                '{"trait_type":"Title","value":"', cert.title, '"},',
                '{"trait_type":"Achievement","value":"', cert.achievement, '"},',
                '{"trait_type":"Minted At","display_type":"date","value":', cert.mintedAt.toString(), "}",
                "]}"
            )
        );

        return string(
            abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(json)))
        );
    }

    /**
     * @dev Generates an SVG certificate image
     */
    function _generateSVG(Certificate memory cert, uint256 tokenId) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="350" viewBox="0 0 500 350">',
                '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">'
                '<stop offset="0%" style="stop-color:#1e1b4b"/>'
                '<stop offset="100%" style="stop-color:#312e81"/>'
                "</linearGradient></defs>",
                '<rect width="500" height="350" rx="20" fill="url(#bg)"/>',
                '<rect x="10" y="10" width="480" height="330" rx="15" fill="none" stroke="#6366f1" stroke-width="1" opacity="0.5"/>',
                '<text x="250" y="50" text-anchor="middle" fill="#818cf8" font-size="12" font-family="monospace">GASFLOW CERTIFICATE</text>',
                '<text x="250" y="100" text-anchor="middle" fill="#e0e7ff" font-size="22" font-weight="bold" font-family="sans-serif">',
                cert.title,
                "</text>",
                '<text x="250" y="150" text-anchor="middle" fill="#a5b4fc" font-size="14" font-family="sans-serif">Awarded to</text>',
                '<text x="250" y="185" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="bold" font-family="sans-serif">',
                cert.recipientName,
                "</text>",
                '<line x1="100" y1="210" x2="400" y2="210" stroke="#6366f1" stroke-width="0.5" opacity="0.4"/>',
                '<text x="250" y="245" text-anchor="middle" fill="#c7d2fe" font-size="11" font-family="sans-serif">',
                cert.achievement,
                "</text>",
                '<text x="250" y="310" text-anchor="middle" fill="#6366f1" font-size="10" font-family="monospace">Token #',
                tokenId.toString(),
                " | Base Sepolia | Powered by UGF</text>",
                "</svg>"
            )
        );
    }

    /**
     * @notice Get certificate data for a token
     * @param tokenId The token ID
     */
    function getCertificate(uint256 tokenId) external view returns (
        string memory recipientName,
        string memory title,
        string memory achievement,
        uint256 mintedAt
    ) {
        _requireOwned(tokenId);
        Certificate memory cert = certificates[tokenId];
        return (cert.recipientName, cert.title, cert.achievement, cert.mintedAt);
    }
}

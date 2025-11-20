"use client";

import { useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
import { ExaminationImage } from "../../types/patient";

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ExaminationImage;
}

export default function ImageViewerModal({
  isOpen,
  onClose,
  image,
}: ImageViewerModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleClose = () => {
    setZoom(1);
    setRotation(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl max-h-[95vh] w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {image.bodyPart} {image.type} Scan
              </h2>
              <p className="text-sm text-gray-600">
                {new Date(image.createdAt).toLocaleDateString()} •{" "}
                {image.description}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-2 p-4 bg-gray-50 border-b border-gray-200">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={zoom >= 3}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button
            onClick={handleRotate}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = image.url;
              link.download = `${image.bodyPart}_${image.type}_${image.createdAt}.jpg`;
              link.click();
            }}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative bg-black overflow-auto max-h-[calc(95vh-140px)]">
          <div className="flex items-center justify-center min-h-[400px] p-4">
            <img
              src={image.url}
              alt={`${image.type} scan of ${image.bodyPart}`}
              className="max-w-none transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                filter: "brightness(1.1) contrast(1.1)", // Enhance medical image visibility
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE1NS44IDE0My4zIDE1NS44IDIwNi43IDIwMCAyNTBDMjQ0LjIgMjkzLjMgMzA3LjggMjkzLjMgMzUyIDI1MEMzOTYuMiAyMDYuNyAzOTYuMiAxNDMuMyAzNTIgMTAwQzMwNy44IDU2LjcgMjQ0LjIgNTYuNyAyMDAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
              }}
            />
          </div>
        </div>

        {/* Image Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-700">Image Type:</label>
              <p className="text-gray-600">{image.type}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Body Part:</label>
              <p className="text-gray-600">{image.bodyPart}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Scan Date:</label>
              <p className="text-gray-600">
                {new Date(image.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <label className="font-medium text-gray-700">Description:</label>
            <p className="text-gray-600 mt-1">{image.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

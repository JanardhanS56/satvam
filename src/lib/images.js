import React, { useState } from 'react';

export function normalizeImagePath(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.replace(/^\/+/, '');
  if (clean.toLowerCase().startsWith('references/')) {
    return `/${clean}`;
  }
  return `/references/${clean}`;
}

export function createPlaceholderDataUrl(text = 'Placeholder') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="100%" height="100%" fill="#F5EFE3"/>
    <rect x="12" y="12" width="376" height="376" fill="none" stroke="#6B5B45" stroke-opacity="0.25" stroke-dasharray="6,6" rx="8"/>
    <text x="50%" y="46%" font-family="Inter, sans-serif" font-size="14" fill="#6B5B45" text-anchor="middle">Satvam Reference</text>
    <text x="50%" y="54%" font-family="Fraunces, serif" font-size="12" fill="#2D3E2F" text-anchor="middle" opacity="0.7">${text}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function SafeImage({
  src,
  alt = 'Satvam asset',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fallbackText,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = hasError
    ? createPlaceholderDataUrl(fallbackText || alt || (typeof src === 'string' ? src.split('/').pop() : 'Image'))
    : normalizeImagePath(src);

  return React.createElement('img', {
    src: resolvedSrc,
    alt,
    className,
    loading,
    decoding,
    onError: () => setHasError(true),
    ...props
  });
}

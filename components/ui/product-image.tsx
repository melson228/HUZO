"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductImageProps {
  images?: string[];
  alt?: string;
  className?: string;
  priority?: boolean;
  variant?: "single" | "gallery";
  enableFullscreen?: boolean;
  onFullscreenClick?: () => void;
  objectFit?: "cover" | "contain" | "fill" | "none";
  enableSwipe?: boolean;
  showNavigation?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  blurDataURL?: string;
}

// Дефолтное изображение
const DEFAULT_IMAGE = "/default/product-default.jpg";

export function ProductImage({
  images = [],
  alt = "Изображение продукта",
  className,
  priority = false,
  variant = "single",
  enableFullscreen = false,
  onFullscreenClick,
  objectFit = "contain",
  showNavigation = false,
  loading = "lazy",
  quality = 85,
  blurDataURL,
}: ProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(DEFAULT_IMAGE);
  const errorRef = useRef<Set<string>>(new Set());

  // Получение безопасного источника изображения
  const getSafeImageSrc = useCallback((src: string | undefined): string => {
    if (!src || typeof src !== "string" || src.trim() === "") {
      return DEFAULT_IMAGE;
    }
    return src.trim();
  }, []);

  // Инициализация текущего изображения
  useEffect(() => {
    const initialImage =
      images.length > 0 ? getSafeImageSrc(images[0]) : DEFAULT_IMAGE;
    setCurrentImageSrc(initialImage);
    setHasError(errorRef.current.has(initialImage));
    setCurrentImageIndex(0);
  }, [images, getSafeImageSrc]);

  // Мемоизация текущего изображения
  const currentImage = useMemo(() => {
    if (!images.length) return DEFAULT_IMAGE;
    const img = images[currentImageIndex];
    return getSafeImageSrc(img);
  }, [images, currentImageIndex, getSafeImageSrc]);

  // Обновляем currentImageSrc при изменении currentImage
  useEffect(() => {
    if (
      currentImage !== currentImageSrc &&
      !errorRef.current.has(currentImage)
    ) {
      setCurrentImageSrc(currentImage);
      setHasError(false);
    }
  }, [currentImage, currentImageSrc]);

  // Навигация
  const nextImage = useCallback(() => {
    if (images.length <= 1) return;

    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % images.length;
      const nextImageSrc = getSafeImageSrc(images[next]);
      setHasError(errorRef.current.has(nextImageSrc));
      return next;
    });
  }, [images, getSafeImageSrc]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;

    setCurrentImageIndex((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      const nextImageSrc = getSafeImageSrc(images[next]);
      setHasError(errorRef.current.has(nextImageSrc));
      return next;
    });
  }, [images, getSafeImageSrc]);

  const goToImage = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length || index === currentImageIndex)
        return;

      const newImageSrc = getSafeImageSrc(images[index]);
      setHasError(errorRef.current.has(newImageSrc));
      setCurrentImageIndex(index);
    },
    [currentImageIndex, images, getSafeImageSrc]
  );

  const handleImageClick = useCallback(() => {
    if (enableFullscreen && onFullscreenClick && !hasError) {
      onFullscreenClick();
    }
  }, [enableFullscreen, onFullscreenClick, hasError]);

  // Обработчик ошибок загрузки
  const handleImageError = useCallback(() => {
    if (!errorRef.current.has(currentImageSrc)) {
      console.warn(`Ошибка загрузки изображения: ${currentImageSrc}`);
      errorRef.current.add(currentImageSrc);
      setHasError(true);
      setCurrentImageSrc(DEFAULT_IMAGE);
    }
  }, [currentImageSrc]);

  // Обработчик успешной загрузки
  const handleImageLoad = useCallback(() => {
    errorRef.current.delete(currentImageSrc);
    setHasError(false);
  }, [currentImageSrc]);

  const isSingleMode = images.length <= 1 || variant === "single";

  // Определяем финальный src для изображения
  const finalImageSrc = hasError ? DEFAULT_IMAGE : currentImageSrc;

  if (isSingleMode) {
    return (
      <div className="relative w-full h-full group">
        <div
          className={cn(
            "relative w-full h-full",
            enableFullscreen && !hasError && "cursor-zoom-in"
          )}
          onClick={handleImageClick}
        >
          <Image
            src={finalImageSrc}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              className,
              objectFit === "cover" && "object-cover",
              objectFit === "contain" && "object-contain",
              objectFit === "fill" && "object-fill",
              objectFit === "none" && "object-none",
              "transition-opacity duration-300"
            )}
            priority={priority}
            loading={loading}
            quality={quality}
            blurDataURL={blurDataURL}
            onError={handleImageError}
            onLoad={handleImageLoad}
            draggable={false}
            unoptimized={hasError || finalImageSrc === DEFAULT_IMAGE}
          />
        </div>

        {enableFullscreen && onFullscreenClick && !hasError && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFullscreenClick();
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-sm z-10"
            aria-label="Открыть в полноэкранном режиме"
          >
            <Maximize2 className="w-4 h-4 text-gray-800" />
          </button>
        )}
      </div>
    );
  }

  // Галерея с несколькими изображениями
  return (
    <div className="relative w-full h-full group">
      {/* Основное изображение */}
      <div
        className={cn(
          "relative w-full h-full",
          enableFullscreen && !hasError && "cursor-zoom-in"
        )}
        onClick={handleImageClick}
      >
        <Image
          src={finalImageSrc}
          alt={`${alt} ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            className,
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "none" && "object-none",
            "transition-opacity duration-300"
          )}
          priority={priority && currentImageIndex === 0}
          loading={loading}
          quality={quality}
          blurDataURL={blurDataURL}
          onError={handleImageError}
          onLoad={handleImageLoad}
          draggable={false}
          unoptimized={hasError || finalImageSrc === DEFAULT_IMAGE}
        />
      </div>

      {/* Кнопка полноэкранного режима */}
      {enableFullscreen && onFullscreenClick && !hasError && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFullscreenClick();
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-sm z-10"
          aria-label="Открыть в полноэкранном режиме"
        >
          <Maximize2 className="w-4 h-4 text-gray-800" />
        </button>
      )}

      {/* Навигационные кнопки */}
      {showNavigation && images.length > 1 && !hasError && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            disabled={images.length <= 1}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-sm z-10"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            disabled={images.length <= 1}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-sm z-10"
            aria-label="Следующее изображение"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </Button>
        </>
      )}

      {/* Индикатор текущего изображения */}
      {showNavigation && images.length > 1 && !hasError && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentImageIndex
                  ? "bg-gray-900 w-6 scale-110"
                  : "bg-white/80 hover:bg-white"
              )}
              aria-label={`Перейти к изображению ${index + 1}`}
              aria-current={index === currentImageIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Компонент для превью миниатюр
export function ProductImageThumbs({
  images = [],
  currentIndex,
  onChange,
  className,
}: {
  images?: string[];
  currentIndex: number;
  onChange: (index: number) => void;
  className?: string;
}) {
  const DEFAULT_IMAGE = "/default/product-default.jpg";
  const errorRef = useRef<Set<string>>(new Set());

  const getSafeImageSrc = (src: string | undefined): string => {
    if (!src || typeof src !== "string" || src.trim() === "") {
      return DEFAULT_IMAGE;
    }
    return src.trim();
  };

  if (!images || images.length <= 1) return null;

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto py-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
        className
      )}
    >
      {images.map((image, index) => {
        const imgSrc = getSafeImageSrc(image);
        const isActive = index === currentIndex;
        const hasError = errorRef.current.has(imgSrc);
        const finalSrc = hasError ? DEFAULT_IMAGE : imgSrc;

        if (!imgSrc) return null;

        return (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={cn(
              "relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-[1.02] active:scale-95",
              isActive
                ? "border-primary shadow-md ring-2 ring-primary/20"
                : "border-transparent hover:border-gray-300"
            )}
            aria-label={`Показать изображение ${index + 1}`}
            aria-current={isActive ? "true" : "false"}
          >
            <Image
              src={finalSrc}
              alt={`Превью ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
              onError={() => {
                if (!errorRef.current.has(imgSrc)) {
                  errorRef.current.add(imgSrc);
                }
              }}
              loading="lazy"
              draggable={false}
              unoptimized={hasError || finalSrc === DEFAULT_IMAGE}
            />

            {!isActive && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            )}
          </button>
        );
      })}
    </div>
  );
}

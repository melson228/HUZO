"use client";

import {
  X,
  ShoppingCart,
  Star,
  Leaf,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { Product } from "@/lib/products-data";
import { useEffect, useRef, useState, SyntheticEvent } from "react";
import CartCounter from "./cart-counter";
import { ProductImage, ProductImageThumbs } from "./product-image";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

function FullscreenGallery({
  product,
  images,
  currentImageIndex,
  setCurrentImageIndex,
  isFullscreen,
  setIsFullscreen,
}: {
  product: Product;
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}) {
  const [fullscreenTouchStart, setFullscreenTouchStart] = useState<
    number | null
  >(null);

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  const handleFullscreenTouchStart = (e: React.TouchEvent) => {
    if (images.length <= 1) return;
    setFullscreenTouchStart(e.touches[0].clientX);
  };

  const handleFullscreenTouchEnd = (e: React.TouchEvent) => {
    if (!fullscreenTouchStart || images.length <= 1) return;

    const touchEndX = e.changedTouches[0].clientX;
    const minSwipeDistance = 30;
    const distance = fullscreenTouchStart - touchEndX;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      nextImage();
    } else {
      prevImage();
    }

    setFullscreenTouchStart(null);
  };

  const handleFullscreenImageError = (
    e: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/default/product-default.jpg";
  };

  if (!isFullscreen || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
      onTouchStart={handleFullscreenTouchStart}
      onTouchEnd={handleFullscreenTouchEnd}
    >
      {/* Кнопка закрыть */}
      <button
        onClick={() => setIsFullscreen(false)}
        className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors group"
        aria-label="Выйти из полноэкранного режима"
      >
        <Minimize2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Основное изображение в центре */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
        <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
          <Image
            src={images[currentImageIndex] || "/default/product-default.jpg"}
            alt={`${product.name} - изображение ${currentImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain rounded-lg"
            priority
            onError={handleFullscreenImageError}
          />
        </div>
      </div>

      {/* Навигационные стрелки*/}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 md:w-12 md:h-12 rounded-full"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="w-4 h-4 md:w-8 md:h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 md:w-12 md:h-12 rounded-full"
            aria-label="Следующее изображение"
          >
            <ChevronRight className="w-4 h-4 md:w-8 md:h-8" />
          </Button>
        </>
      )}

      {/* Индикаторы внизу */}
      {images.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all hover:scale-125",
                index === currentImageIndex
                  ? "bg-white w-4 md:w-8"
                  : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Перейти к изображению ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Счетчик */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-white/80 text-sm">
        <div className="bg-black/50 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm">
          <span className="font-medium">{currentImageIndex + 1}</span>
          <span className="mx-1 md:mx-2">/</span>
          <span>{images.length}</span>
        </div>
      </div>

      {/* Подсказка о свайпе для мобильных */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm md:hidden">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg text-xs">
            <ChevronLeft className="w-3 h-3" />
            <span>Свайп для навигации</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const images = product?.images || [];

  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
      setIsFullscreen(false);
    }
  }, [product]);

  // Обработчики свайпа для мобильных
  const handleTouchStart = (e: React.TouchEvent) => {
    if (images.length <= 1) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX || images.length <= 1) return;

    const touchEndX = e.changedTouches[0].clientX;
    const minSwipeDistance = 50;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Свайп влево
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      // Свайп вправо
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !isFullscreen
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (!product || images.length <= 1) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        );
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        setIsFullscreen(!isFullscreen);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleKeydown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, product, images.length, isFullscreen]);

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  if (!isOpen || !product) return null;

  return (
    <>
      {/* Основное модальное окно */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          ref={modalRef}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-6 border-b border-huzo-cream">
            <h2 className="text-2xl font-light text-huzo-green">
              {product.name}
            </h2>
            <div className="flex items-center gap-2">
              {/* Кнопка полноэкранного режима */}
              {images.length > 0 && (
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-2 hover:bg-huzo-cream rounded-full transition-colors group"
                  aria-label="Открыть в полноэкранном режиме"
                >
                  <Maximize2 className="w-5 h-5 text-huzo-green group-hover:scale-110 transition-transform" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-huzo-cream rounded-full transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-6 h-6 text-huzo-green" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {/* Галерея изображений с поддержкой свайпа */}
                <div
                  className="relative group mb-4"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="bg-linear-to-br from-huzo-mint to-huzo-cream h-80 rounded-2xl overflow-hidden">
                    {images.length > 0 ? (
                      <ProductImage
                        images={[images[currentImageIndex]]}
                        alt={product.name}
                        className="rounded-2xl"
                        variant="single"
                        enableFullscreen={true}
                        onFullscreenClick={() => setIsFullscreen(true)}
                        enableSwipe={false}
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <ShoppingCart className="w-16 h-16 text-huzo-green mx-auto mb-4" />
                        <p className="text-huzo-green/60">
                          Изображение продукта
                        </p>
                      </div>
                    )}
                  </div>

                  {/* НАВИГАЦИОННЫЕ СТРЕЛКИ*/}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevImage}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                        aria-label="Предыдущее изображение"
                      >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-huzo-green" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                        aria-label="Следующее изображение"
                      >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-huzo-green" />
                      </Button>

                      {/* Индикатор текущего изображения */}
                      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={cn(
                              "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all hover:scale-125",
                              index === currentImageIndex
                                ? "bg-huzo-green w-3 md:w-4"
                                : "bg-white/80 hover:bg-white"
                            )}
                            aria-label={`Перейти к изображению ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Счетчик изображений */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>

                      {/* Подсказка о свайпе для мобильных */}
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:hidden">
                        <div className="flex items-center gap-1 text-xs text-white/70 bg-black/30 px-3 py-1 rounded-full">
                          <ChevronLeft className="w-3 h-3" />
                          <span>Свайп</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Миниатюры */}
                {images.length > 1 && (
                  <ProductImageThumbs
                    images={images}
                    currentIndex={currentImageIndex}
                    onChange={setCurrentImageIndex}
                  />
                )}

                {/* Блок с ценой */}
                <div className="bg-huzo-cream/30 rounded-2xl p-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-light text-huzo-green">
                      {product.price}
                    </span>
                    <span className="text-huzo-green/60 bg-huzo-mint/30 px-3 py-1 rounded-full">
                      {product.volume}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <CartCounter product={product} size="lg" variant="both" />
                  </div>
                </div>
              </div>

              {/* Информация о продукте */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-huzo-green mb-3">
                    Описание
                  </h3>
                  <p className="text-huzo-green/70 leading-relaxed">
                    {product.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-huzo-green mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Особенности
                  </h3>
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-huzo-green/70"
                      >
                        <div className="w-2 h-2 bg-huzo-mint rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-huzo-green mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Активные компоненты
                  </h3>
                  <div className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <div key={index} className="text-huzo-green/70 text-sm">
                        • {ingredient}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-huzo-green mb-3">
                    Способ применения
                  </h3>
                  <div className="space-y-2">
                    {product.usage.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start text-huzo-green/70"
                      >
                        <span className="bg-huzo-mint text-huzo-green w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 shrink-0">
                          {index + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Рендерим полноэкранную галерею поверх модального окна */}
      <FullscreenGallery
        product={product}
        images={images}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />
    </>
  );
}

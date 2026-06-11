import { Link } from 'react-router-dom'
import {
  X,
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
} from 'lucide-react'
import { useCartStore } from '../../hooks/useCartStore'

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCartStore()

  return (
    <>
      {/* Backdrop */}
      <div
        className={
          'fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ' +
          (isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
        }
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={
          'fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl ' +
          'transform transition-transform duration-300 ease-in-out ' +
          (isOpen ? 'translate-x-0' : 'translate-x-full')
        }
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <h2 className="text-base font-semibold text-gray-900">Your Cart</h2>
            {totalItems > 0 && (
              <span className="text-xs text-gray-500">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm text-gray-500 mb-6">Your cart is empty</p>
              <Link
                to="/shop"
                onClick={closeDrawer}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 bg-gray-50 rounded-xl p-3"
                >
                  {/* Thumbnail */}
                  <div className="shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg bg-white"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.variantName}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-gray-200 text-gray-600 hover:bg-white hover:border-gray-300 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-medium text-gray-900 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-gray-200 text-gray-600 hover:bg-white hover:border-gray-300 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-base font-semibold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={closeDrawer}
              className="block w-full text-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-colors font-semibold"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

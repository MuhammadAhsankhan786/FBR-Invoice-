import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Send } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  hsCode: string;
  quantity: number;
  unit: string;
  rate: number;
}

export function CreateInvoice() {
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState('');
  const [buyerNTN, setBuyerNTN] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', hsCode: '', quantity: 0, unit: 'PCS', rate: 0 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', hsCode: '', quantity: 0, unit: 'PCS', rate: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateLineAmount = (item: InvoiceItem) => {
    return item.quantity * item.rate;
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateLineAmount(item), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSaveDraft = () => {
    alert('Invoice saved as draft');
  };

  const handleSubmitToFBR = () => {
    alert('Invoice submitted to FBR successfully');
    navigate('/invoices');
  };

  return (
    <div className="max-w-[1400px]">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl text-slate-900 mb-1">Create Sales Tax Invoice</h1>
        <p className="text-sm text-slate-600">FBR Digital Invoice Generation</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm">
        {/* Seller Information */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm lg:text-base text-slate-900">Seller Information (Read-Only)</h2>
        </div>
        <div className="px-4 lg:px-6 py-5 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-xs text-slate-600 mb-1">Company Name</label>
              <input
                type="text"
                value="ABC Enterprises (Pvt) Ltd"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">NTN</label>
              <input
                type="text"
                value="1234567-8"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">STRN</label>
              <input
                type="text"
                value="32-00-0000-000-00"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Address</label>
              <input
                type="text"
                value="123 Business District, Karachi, Pakistan"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Buyer Information */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm lg:text-base text-slate-900">Buyer Information</h2>
        </div>
        <div className="px-4 lg:px-6 py-5 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="col-span-2">
              <label className="block text-xs text-slate-600 mb-1">Buyer Name *</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">NTN / CNIC</label>
              <input
                type="text"
                value={buyerNTN}
                onChange={(e) => setBuyerNTN(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
              >
                <option>Cash</option>
                <option>Credit</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-slate-600 mb-1">Address</label>
              <input
                type="text"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
              />
            </div>
          </div>
        </div>

        {/* Invoice Confirmation */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm lg:text-base text-slate-900">Invoice Confirmation</h2>
        </div>
        <div className="px-4 lg:px-6 py-5 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-xs text-slate-600 mb-1">Invoice Number</label>
              <input
                type="text"
                value="INV-2026-00249"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Invoice Date</label>
              <input
                type="date"
                defaultValue="2026-02-09"
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
              />
            </div>
          </div>
        </div>

        {/* Item Details Table */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm lg:text-base text-slate-900">Item Details</h2>
            <button
              onClick={addItem}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1e3a5f] text-white text-sm rounded-sm hover:bg-[#2d5280]"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Item</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[30%]">Description / Product Name</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[12%]">HS Code</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[10%]">Quantity</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[10%]">Unit</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[12%]">Rate (PKR)</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[15%]">Line Amount</th>
                <th className="px-4 py-3 text-center text-xs text-slate-600 w-[8%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.hsCode}
                      onChange={(e) => updateItem(item.id, 'hsCode', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                      placeholder="0000.00.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.quantity || ''}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.unit}
                      onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                    >
                      <option>PCS</option>
                      <option>KG</option>
                      <option>LTR</option>
                      <option>MTR</option>
                      <option>BOX</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.rate || ''}
                      onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900">
                    PKR {calculateLineAmount(item).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 hover:bg-red-50 rounded-sm text-red-600 disabled:opacity-30"
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Summary */}
        <div className="px-4 lg:px-6 py-5 border-t border-slate-200 bg-slate-50">
          <div className="flex justify-end">
            <div className="w-full sm:w-96">
              <div className="flex justify-between py-2 border-b border-slate-300">
                <span className="text-sm text-slate-700">Subtotal:</span>
                <span className="text-sm text-slate-900">PKR {calculateSubtotal().toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-300">
                <span className="text-sm text-slate-700">Sales Tax (18%):</span>
                <span className="text-sm text-slate-900">PKR {calculateTax().toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-3 bg-[#1e3a5f] text-white px-4 mt-2 rounded-sm">
                <span className="text-base">Total Invoice Value:</span>
                <span className="text-lg">PKR {calculateTotal().toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 lg:px-6 py-5 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </button>
          <button
            onClick={handleSubmitToFBR}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1e3a5f] text-white rounded-sm hover:bg-[#2d5280]"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Save & Submit to FBR</span>
            <span className="sm:hidden">Submit to FBR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
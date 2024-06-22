import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import ooty from '../content/Itinerary';

const InvoiceForm = ({ onSubmit }) => {
  const billItems = ooty.itinerary
  .filter((e) => e.locationID.typeLocation === 'hotel')
  .map((item) =>  {
    return {
      description: item.locationID.name,
      quantity: 1,
      price: Number.parseInt(item.locationID.cost.min, 10)
    }
  });
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      invoiceNumber: "CMT"+Math.floor(new Date().getTime() / 1000),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      billTo: '',
      items: billItems
      // items: [{ description: '', quantity: 1, price: 0 },{ description: '', quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 bg-white shadow-md rounded-lg">
      <div>
        <label className="block mb-2">Invoice Number</label>
        <input required {...register('invoiceNumber')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2">Date</label>
        <input required type="date" {...register('date')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2">Time</label>
        <input required type="time" {...register('time')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2">Bill To</label>
        <input required {...register('billTo')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2">Items</label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex space-x-2 mb-2">
            <input
              {...register(`items.${index}.description`)}
              placeholder="Description"
              className="border p-2 w-full rounded-md"
            />
            <input
              type="number"
              {...register(`items.${index}.quantity`)}
              placeholder="Quantity"
              className="border p-2 w-20 rounded-md"
            />
            <input
              type="number"
              {...register(`items.${index}.price`)}
              placeholder="Price"
              className="border p-2 w-20 rounded-md"
            />
            <button type="button" onClick={() => remove(index)} className="p-2 text-red-500">
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ description: '', quantity: 1, price: 0 })}
          className="p-2 text-blue-500 flex items-center space-x-1"
        >
          <FaPlus /> <span>Add Item</span>
        </button>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;

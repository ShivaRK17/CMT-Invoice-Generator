import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useApp } from '../context/AppProvider';
import { ThreeDots } from 'react-loader-spinner';

const InvoiceForm = ({ onSubmit }) => {
  const { allTrips, fetchTrips, selectedTrip, setSelectedTrip, fetchTripItems, selectedItems, tripsLoader, itemsLoader } = useApp();
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      invoiceNumber: "CMT" + Math.floor(new Date().getTime() / 1000),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      billTo: '',
      items: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'items',
  });

  const getBillItems = (data) => {
    return data?.map((item) => {
      return {
        description: item.locationName,
        quantity: 1,
        price: Number.parseInt(item.cost.min, 10),
      };
    });
  };

  const setCurrentTripItems = async (trip) => {
    setSelectedTrip(trip);
    await fetchTripItems(trip.id);
    console.log(trip.id);

    const items = getBillItems(selectedItems);
    setValue('items', items);
    replace(items);
  };

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    // if (selectedItems.length > 0) {
    const items = getBillItems(selectedItems);
    setValue('items', items);
    replace(items);
    // }
  }, [selectedItems, setValue, replace]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 bg-white shadow-md rounded-lg">
      <div>
        <label className="block mb-2 font-semibold">Invoice Number</label>
        <input required {...register('invoiceNumber')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Date</label>
        <input required type="date" {...register('date')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Time</label>
        <input required type="time" {...register('time')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Bill To</label>
        <input required {...register('billTo')} className="border p-2 w-full rounded-md" />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Trips</label>
        {tripsLoader ? <>
          <div className='flex w-full items-center justify-center p-5'>
            <ThreeDots
              visible={true}
              height="70"
              width="70"
              color="blue"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />

          </div>
        </> : <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {allTrips.map((e, ind) => (
            <div
              onClick={() => setCurrentTripItems(e)}
              key={ind}
              className={`${selectedTrip?.name === e.name && 'bg-blue-200'
                } font-semibold text-sm cursor-pointer border-blue-500 border-2 text-blue-800 p-2 rounded-lg flex items-center justify-center`}
            >
              {e.name}
            </div>
          ))}
        </div>}
      </div>
      <div>
        <label className="block mb-2 font-semibold">Hotels</label>
        {fields.length===0 && <h3 className='mx-2'>No Hotels</h3>}
        {itemsLoader ? <>
          <div className='flex w-full items-center justify-center p-5'>
            <ThreeDots
              visible={true}
              height="70"
              width="70"
              color="blue"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </> : fields.map((item, index) => (
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

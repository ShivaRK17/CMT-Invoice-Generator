import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext();

const useAppContext = () => {
    const [allTrips, setAllTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [tripsLoader, setTripsLoader] = useState(true);
    const [itemsLoader, setItemsLoader] = useState(false)
    const fetchTrips = async () => {
        try {
            const response = await fetch('https://api.clonemytrips.com/trip', {
                method: 'GET',
                headers: {
                    authorization: process.env.REACT_APP_AUTH
                }
            });
            const data = await response.json();
            setAllTrips(data);
            setTripsLoader(false);
        } catch (error) {
            console.error('Failed to fetch trips:', error);
        }
    };
    const fetchTripItems = async (id) => {
        try {
            setItemsLoader(true);
            const response = await fetch(`https://api.clonemytrips.com/trip/${id}/hotel`, {
                method: 'GET',
                headers: {
                    authorization: process.env.REACT_APP_AUTH
                }
            });
            const data = await response.json();
            setSelectedItems(data.hotelItems);
            setItemsLoader(false);
        } catch (error) {
            console.error('Failed to fetch trips:', error);
        }
    }

    return {
        allTrips, setAllTrips,
        selectedTrip, setSelectedTrip,
        fetchTrips,
        fetchTripItems,
        selectedItems, setSelectedItems,
        tripsLoader, setTripsLoader,
        itemsLoader, setItemsLoader
    };
}

const AppProvider = ({ children }) => {
    const contextValue = useAppContext();
    return <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
}
const useApp = () => {
    return useContext(AppContext);
}

export { useApp, AppProvider }
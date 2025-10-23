import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { nextQuote } from '../store';

export const useQuotesStore = () => {
    const dispatch = useDispatch();
    const { quotes, currentIndex } = useSelector(state => state.quotes);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(nextQuote());
        }, 100000); // 6 minutos = 360000 ms
        return () => clearInterval(interval);
    }, [dispatch]);

    return {
        quote: quotes[currentIndex],
    };
};
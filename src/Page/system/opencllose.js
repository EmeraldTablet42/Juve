import React, {useEffect, useState} from 'react'

const Openclose = (elem, initialstate) => {
    const [Open, setOpen] = useEffect(initialstate);
    useEffect(() => {
        const onClick = (e) =>{
            if (elem.current !== null && !elem.current.contains(e.target)) {
                setOpen(!Open);
            }
        };
            if (Open) {
                window.addEventListener("click", onClick);
            }
            return () => {
                window.removeEventListener("click", onClick);
            };
        }, [Open, elem]);
        return [Open, setOpen];
        };

export default Openclose
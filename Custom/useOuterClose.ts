import { useEffect, MouseEvent, MouseEventHandler, SetStateAction, ReactNode, MutableRefObject } from "react";

const useOuterClose = (ref: MutableRefObject<undefined | HTMLElement>, setter: SetStateAction<boolean | any>) => {
    useEffect(() => {
        const handleOutsideClick: MouseEventHandler<MouseEvent> = (event) => {
            if (!ref.current) {
                return;
            }

            if (!ref.current.contains(event.target)) {
                setter(false);
            }
        }

        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [ref, setter]);
}

export default useOuterClose;

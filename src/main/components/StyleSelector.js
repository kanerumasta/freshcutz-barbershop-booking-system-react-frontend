import { RadioGroup, VisuallyHidden, cn, useRadio } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectServices,
    selectTotal,
    setServices,
    setTotal,
} from "../../state/bookingSlice";

export const CustomRadio = (props) => {
    const {
        Component,
        children,

        description,

        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps,
    } = useRadio(props);

    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                "cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
                "data-[selected=true]:border-primary"
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span {...getWrapperProps()}>
                <span {...getControlProps()} />
            </span>
            <div {...getLabelWrapperProps()}>
                {children && <span {...getLabelProps()}>{children}</span>}
                {description && (
                    <span className="text-small text-foreground opacity-70">
                        {description}
                    </span>
                )}
            </div>
        </Component>
    );
};

export const StyleSelector = ({ service, styles }) => {
    const dispatch = useDispatch();
    const total = useSelector(selectTotal);
    const services = useSelector(selectServices);
    const selectedStyle =
        services.find((s) => parseInt(s.service) === parseInt(service))
            ?.style || null;

    useEffect(() => {
        // Calculate the new total based on the selected styles
        const newTotal = services
            .filter((s) => s.style !== null)
            .reduce((acc, cur) => {
                const selectedStyle = styles.find(
                    (style) => style.id === cur.style
                );
                return (
                    acc + parseFloat(selectedStyle ? selectedStyle.price : 0)
                );
            }, 0);

        // Dispatch the updated total to the Redux store
        dispatch(setTotal(newTotal));
    }, [services, styles, dispatch]);

    const handleSelectionChange = (e) => {
        const selectedStyleId = parseInt(e.target.value);

        const existingService = services.find(
            (s) => parseInt(s.service) === parseInt(service)
        );

        if (existingService) {
            // Update the selected style for the existing service
            dispatch(
                setServices(
                    services.map((s) =>
                        s.service === service
                            ? { ...s, style: selectedStyleId }
                            : s
                    )
                )
            );
        } else {
            // Add a new service with the selected style
            dispatch(
                setServices([
                    ...services,
                    {
                        service: parseInt(service),
                        style: selectedStyleId,
                    },
                ])
            );
        }
    };

    return (
        <RadioGroup value={selectedStyle} onChange={handleSelectionChange}>
            {styles.map((style) => (
                <CustomRadio value={style.id}>
                    <span className="font-bold capitalize">{style.name}</span>
                </CustomRadio>
            ))}
        </RadioGroup>
    );
};

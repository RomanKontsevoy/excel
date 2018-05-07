export const select = (car) => {
    alert("Now car is: " + car.model);
    return {
        type: "CAR_SELECTED",
        payload: car
    }
};
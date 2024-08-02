export const formatDistance = (distance: number) : string => {
    if (distance < 1) {
        const meters = distance * 1000;
        return `${meters.toFixed(0)} m`
    } else {
        return `${distance.toFixed(2)} km`
    }
  }
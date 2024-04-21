//To metric
export function getKgs(hec: number): number {
    const weightInHec = hec;
    const weightInKg = ((weightInHec / 100) * 10).toFixed(2);
    return Number(weightInKg);
}

export function getCm(val:number): number {
    const heightInDec = val;
    const heightInCm = heightInDec * 10;
    return heightInCm;
}

//to imperial

export function getLbs(hec: number): number {
    const weightInHec = hec;
    const weightInLbs = ((weightInHec * 2.20462) / 10).toFixed(1);
    return Number(weightInLbs);
}

export function getFeet (val: number, getCm: (val: number) => number): number {
    const heightInFeet = (Math.ceil(getCm(val) / 2.54) / 12).toFixed(1);
    return Number(heightInFeet);
}

export const nanoId = () => {
    const index = Math.random()
    return index;
  }
  
export const productStatus = {
    1: "ACTIVE",
    2: "INACTIVE",
    3: "DISCONTINUED",
    4: "PENDING_APPROVAL",
    5: "ARCHIVED",
} as const;

export const productStatusKeys = {
    "ACTIVE": 1,
    "INACTIVE": 2,
    "DISCONTINUED": 3,
    "PENDING_APPROVAL": 4,
    "ARCHIVED": 5,
} as const;

// eslint-disable-next-line
export type ProductStatus = (typeof productStatus)[keyof typeof productStatus];

export const StockStatus = {
    1: "OUT_OF_STOCK",
    2: "IN_STOCK",
} as const;

// eslint-disable-next-line
export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus];

export const DefaultCurrency = 'AED' as const;

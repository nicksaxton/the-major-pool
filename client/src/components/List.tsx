import * as React from 'react';

type ListProps<Item> = {
    data: Item[];
    getKey: (item: Item) => string | number;
    render: (item: Item) => JSX.Element;
};

const List = <T extends unknown>({ data, getKey, render }: ListProps<T>) => {
    return (
        <>
            {data.map((item, index, items) => (
                <div
                    className="py-2 is-flex is-align-items-center is-justify-content-space-between"
                    key={getKey(item)}
                    style={{
                        borderBottom:
                            index !== items.length - 1 ? '1px solid' : undefined
                    }}
                >
                    {render(item)}
                </div>
            ))}
        </>
    );
};

export default List;

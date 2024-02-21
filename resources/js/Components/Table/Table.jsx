import { Link } from "@inertiajs/react";
import React from "react";
import Icon from "../Icon";
import ActionsTable from "./ActionsTable";


export default ({ data = [], routes = {}, titles = [], actions = [], onTrash, onEdit, onSearch }) => {

    return (
        <table className="w-full whitespace-nowrap">
            <thead>
                <tr className="font-bold text-left">
                    {
                        titles.map( (title, key) => {
                            return <th className="px-6 pt-5 pb-4" key={key} > {title} </th>
                        })
                    }
                    <th className="px-6 pt-5 pb-4"> </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, key) => (
                    <tr
                        key={key}
                        className="hover:bg-gray-100 focus-within:bg-gray-100"
                    >
                        {
                            Object.keys( item ).map((key, idx) => {
                                if ( 
                                    key == 'id' ||
                                    key == 'ruta'
                                ) return;
                                return <td className="border-t" key={ key }>
                                    <a
                                        role="button"
                                        onClick={() => onEdit(item.id)}
                                        className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                    >
                                        { item[key] }
                                        {idx == 0 && item.deleted_at && (
                                            <Icon
                                                name="trash"
                                                className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                            />
                                        )}
                                    </a>
                                </td>
                            })
                        }
                        
                        <td className="w-px border-t">
                            {
                                actions.map( (action, key) => {
                                    if (action === 'trash') {
                                        return <ActionsTable key={key} action={action} onClick={() => onTrash(item.id)}/>
                                    } else if( action === 'edit' ) {
                                        return <ActionsTable key={key} action={action} onClick={() => onEdit(item.id)}/>                                    
                                    } else if( action === 'search' ) {
                                        return <ActionsTable key={key} action={action} onClick={() => onSearch(item.id)}/>                                    
                                    }
                                })
                            }
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td className="px-6 py-4 border-t" colSpan={titles.length}>
                            No data found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

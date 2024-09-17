import { Link } from "@inertiajs/react";
import React from "react";
import Icon from "../Icons/Index";
import ActionsTable from "./ActionsTable";


export default ({ data = [], routes = {}, titles = [], actions = [], ...props }) => {

    return (
        <table className="w-full whitespace-nowrap">
            <thead>
                <tr className="font-bold text-left">
                    {
                        titles.map( (title, key) => {
                            return <th className="px-6 pt-5 pb-4" key={key} > {title} </th>
                        })
                    }

                    {
                        actions.length ? <th className="px-6 pt-5 pb-4"> Acciones </th> : ''
                    }
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
                                    key == 'ruta'
                                ) return;

                                return <td className="border-t" key={ key }>
                                    <a
                                        role="button"
                                        onClick={() => props.onEdit(item.id)}
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

                        {
                            actions.length ?
                                <td className="w-px border-t">
                                    {
                                        actions.map( (action, key) => {
                                            if (action === 'trash') {
                                                return <ActionsTable key={key} action={action} onClick={() => props.onTrash(item.id)}/>
                                            } else if( action === 'edit' ) {
                                                return <ActionsTable key={key} action={action} onClick={() => props.onEdit(item.id)}/>                                    
                                            } else if( action === 'search' ) {
                                                return <ActionsTable key={key} action={action} onClick={() => props.onSearch(item.id)}/>                                    
                                            } else if( action === 'cog' ) {
                                                return <ActionsTable key={key} action={action} onClick={() => props.onConfig(item.id)}/>                                    
                                            } else if( action === 'survey' ) {
                                                return <ActionsTable key={key} action={action} onClick={() => props.onSurvey(item.id)}/>                                    
                                            } else if( action === 'test' ) {
                                                return <ActionsTable key={key} action={action} onClick={() => props.onTest(item.id)}/>                                    
                                            }
                                        })
                                    }
                                </td> : ''
                        }
                        
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td className="px-6 py-4 border-t" colSpan={titles.length + 1}>
                            No data found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

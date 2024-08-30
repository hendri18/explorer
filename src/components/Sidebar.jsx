import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";

const Sidebar = ({ folders, openModalAdd, openModalRename, openModalDelete }) => {
    let { "*": splat } = useParams();

    const renderSubFolders = (subFolders, currentPath) => {
        let { "*": splat } = useParams();
        return (<ul className="sub-folder">
            {subFolders.map((subFolder) => (
                <li key={subFolder.id}>
                    <ContextMenuTrigger id={`ctxm-sidebar-${subFolder.id}`}>
                        <Link to={`${currentPath}/${subFolder.name}`} className={`${splat == `${currentPath}/${subFolder.name}` ? 'active' : ''}`}><i className="bi bi-folder"></i> {subFolder.name}</Link>
                    </ContextMenuTrigger>
                    <ContextMenu id={`ctxm-sidebar-${subFolder.id}`}>
                        <ContextMenuItem preventClose={true} className="text-center fw-bold">{subFolder.name}</ContextMenuItem>
                        <ContextMenuItem onClick={() => openModalRename(subFolder.id, subFolder.name)}><i className="bi bi-pencil"></i> Rename</ContextMenuItem>
                        <ContextMenuItem onClick={() => openModalDelete(subFolder.id, subFolder.name)}><i className="bi bi-trash"></i> Delete</ContextMenuItem>
                    </ContextMenu>
                    {subFolder.sub_folders && subFolder.sub_folders.length > 0 && (
                        renderSubFolders(subFolder.sub_folders, currentPath+'/'+subFolder.name)
                    )}
                </li>
            ))}
        </ul>)
    }

    return (
        <div className="sidebar">
            <button className="btn btn-success w-100" onClick={() => openModalAdd()}><i className="bi bi-folder-plus"></i> Add</button>
            <ul className="root-folder-list">
                {(folders && folders.length > 0) && folders.map((folder) => (
                    <li key={folder.id}>
                        <ContextMenuTrigger id={`ctxm-${folder.id}`}>
                            <Link to={`/folder/${folder.name}`} className={`${splat == `folder/${folder.name}` ? 'active' : ''}`}><i className="bi bi-folder"></i> {folder.name}</Link>
                        </ContextMenuTrigger>
                        <ContextMenu id={`ctxm-${folder.id}`}>
                            <ContextMenuItem preventClose={true} className="text-center fw-bold">{folder.name}</ContextMenuItem>
                            <ContextMenuItem onClick={() => openModalRename(folder.id, folder.name)}><i className="bi bi-pencil"></i> Rename</ContextMenuItem>
                            <ContextMenuItem onClick={() => openModalDelete(folder.id, folder.name)}><i className="bi bi-trash"></i> Delete</ContextMenuItem>
                        </ContextMenu>
                        {(folder.sub_folders && folder.sub_folders.length > 0) && 
                            renderSubFolders(folder.sub_folders, `folder/${folder.name}`)
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
  
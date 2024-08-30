import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-headless-accordion";
import moment from 'moment';

function compareArrays(a, b) {
    let minLength = Math.min(a.length, b.length);
    
    // if (b.length > a.length) 
    //     return false;

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

const Sidebar = ({ folders, openModalAdd, openModalRename, openModalDelete }) => {
    let { "*": splat } = useParams();
    const folderPathArr = splat.split('/');

    const renderSubFolders = (subFolders, currentPath) => {
        return (
            <React.Fragment>
            {subFolders.map((subFolder, i) =>{ 
                const nextPath = currentPath+'/'+subFolder.name;
                const nextPathArr = nextPath.split('/');
                const active = compareArrays(folderPathArr, nextPathArr);
                const hasSubFolder = subFolder.sub_folders && subFolder.sub_folders.length > 0;
                return (<AccordionItem key={i} className="ps-4" isActive={active}>
                    {({open}) => ( <React.Fragment>
                <AccordionHeader className="accordion-menu">
                    <ContextMenuTrigger id={`ctxm-sidebar-${subFolder.id}`}>
                        <Link to={`${currentPath}/${subFolder.name}`}><i className="bi bi-folder"></i> {subFolder.name} {hasSubFolder && <span className="float-end"><i className={open ? "bi bi-caret-down-fill" : "bi bi-caret-right-fill"}></i></span>}</Link>
                    </ContextMenuTrigger>
                    <ContextMenu id={`ctxm-sidebar-${subFolder.id}`}>
                        <ContextMenuItem preventClose={true} className="text-center fw-bold">{subFolder.name}</ContextMenuItem>
                        <ContextMenuItem onClick={() => openModalRename(subFolder.id, subFolder.name)}><i className="bi bi-pencil"></i> Rename</ContextMenuItem>
                        <ContextMenuItem onClick={() => openModalDelete(subFolder.id, subFolder.name)}><i className="bi bi-trash"></i> Delete</ContextMenuItem>
                        <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-clock"></i> {moment(subFolder.created_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                        <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-arrow-clockwise"></i> {moment(subFolder.updated_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                    </ContextMenu>
                </AccordionHeader>
                <AccordionBody>
                    <div className="ps-4">
                    {hasSubFolder && (
                        renderSubFolders(subFolder.sub_folders, nextPath)
                    )}
                    </div>
                </AccordionBody>
                </React.Fragment>)}
            </AccordionItem>)})}
            </React.Fragment>
        )
    }

    return (
        <div className="sidebar">
            <button className="btn btn-success w-100" onClick={() => openModalAdd()}><i className="bi bi-folder-plus"></i> Add</button>
            
            <Accordion>
                {(folders && folders.length > 0) && folders.map((folder, i) => (
                    <AccordionItem key={i} isActive={compareArrays(folderPathArr, ['folder', folder.name])}>
                    {({open}) => ( <React.Fragment>
                        <AccordionHeader className="accordion-menu">
                            <ContextMenuTrigger id={`ctxm-${folder.id}`}>
                                <Link to={`/folder/${folder.name}`} className={`${splat == `folder/${folder.name}` ? 'active' : ''}`}><i className="bi bi-folder"></i> {folder.name} {(folder.sub_folders && folder.sub_folders.length > 0) && <span className="float-end"><i className={open ? "bi bi-caret-down-fill" : "bi bi-caret-right-fill"}></i></span>}</Link>
                            </ContextMenuTrigger>
                            <ContextMenu id={`ctxm-${folder.id}`}>
                                <ContextMenuItem preventClose={true} className="text-center fw-bold">{folder.name}</ContextMenuItem>
                                <ContextMenuItem onClick={() => openModalRename(folder.id, folder.name)}><i className="bi bi-pencil"></i> Rename</ContextMenuItem>
                                <ContextMenuItem onClick={() => openModalDelete(folder.id, folder.name)}><i className="bi bi-trash"></i> Delete</ContextMenuItem>
                                <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-clock"></i> {moment(folder.created_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                                <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-arrow-clockwise"></i> {moment(folder.updated_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                            </ContextMenu>
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="ps-4">
                            {(folder.sub_folders && folder.sub_folders.length > 0) && 
                                renderSubFolders(folder.sub_folders, `folder/${folder.name}`)
                            }
                            </div>
                        </AccordionBody>
                    </React.Fragment>)}
                    </AccordionItem>))}
            </Accordion>
        </div>
    );
};

export default Sidebar;
  
const Sidebar = ({ folders }) => {
    return (
        <div className="sidebar">
            <h2>Folders</h2>
            <ul>
                {folders.map((folder) => (
                    <li key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
  
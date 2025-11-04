import React, { useState, useMemo, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Col,
  Row,
  Container,
  CardTitle,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";

// --- Helper Functions ---
const buildMenuTree = (items, parentId = null) => {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      children: buildMenuTree(items, item.id),
    }));
};

// --- Components ---

const MenuFormModal = ({ isOpen, toggle, onSave, menu }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  React.useEffect(() => {
    setTitle(menu?.title || "");
    setLink(menu?.link || "");
  }, [menu, isOpen]);

  const handleSave = () => {
    onSave({ title, link });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        {menu ? "Edit Menu" : "Create Menu"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="menu-title">Title</Label>
            <Input
              id="menu-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Home"
            />
          </FormGroup>
          <FormGroup>
            <Label for="menu-link">Link (URL)</Label>
            <Input
              id="menu-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g., /home"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const MenuItem = ({ item, onEdit, onDelete, onDragStart }) => {
  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, item)}
      className="menu-item"
    >
      <div className="menu-item-content">
        <span className="drag-handle" style={{ cursor: "grab" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 5h3v3h-3V5zm0 6h3v3h-3v-3zm0 6h3v3h-3v-3zM7 5h3v3H7V5zm0 6h3v3H7v-3zm0 6h3v3H7v-3zM4 5h3v3H4V5zm0 6h3v3H4v-3zm0 6h3v3H4v-3z"></path>
          </svg>
        </span>
        {item.image && (
          <img src={item.image} alt={item.title} className="menu-item-image" />
        )}
        <span>{item.title}</span>
      </div>
      <div className="menu-item-actions">
        <Button color="light" size="sm" onClick={() => onEdit(item)}>
          Edit
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

const MenuList = ({ items, ...props }) => {
  const {
    onDragEnd,
    onDragOverItem,
    onDragOverSubmenuZone,
    clearDropIndicators,
  } = props;

  return (
    <div className="menu-list">
      {items.map((item) => (
        <div
          key={item.id}
          className="menu-item-container"
          onDragOver={(e) => onDragOverItem(e, item.id)}
          onDragLeave={clearDropIndicators}
          onDrop={onDragEnd}
        >
          <div className="menu-item-wrapper">
            <MenuItem item={item} {...props} />
            <div
              className="submenu-drop-zone"
              onDragOver={(e) => onDragOverSubmenuZone(e, item.id)}
              onDrop={onDragEnd}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="submenu-drop-icon"
              >
                <path
                  d="M19,15L13,21L7,15H19M13,3H11V10H13V3M13,11H11V13H13V11Z"
                  transform="rotate(90 12 12)"
                ></path>
              </svg>
              <span>Make Submenu</span>
            </div>
          </div>
          {item.children && item.children.length > 0 && (
            <div className="submenu-list">
              <MenuList items={item.children} {...props} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const HeaderMenuManager = () => {
  const [menus, setMenus] = useState([
    { id: "1", title: "Home", link: "/", parentId: null, order: 0 },
    { id: "2", title: "Shop", link: "/shop", parentId: null, order: 1 },
    {
      id: "3",
      title: "Laptops",
      link: "/shop/laptops",
      parentId: "2",
      order: 0,
    },
    {
      id: "4",
      title: "Smartphones",
      link: "/shop/smartphones",
      parentId: "2",
      order: 1,
    },
    { id: "5", title: "About Us", link: "/about", parentId: null, order: 2 },
    { id: "6", title: "Contact", link: "/contact", parentId: "5", order: 0 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [isRootDropZoneVisible, setIsRootDropZoneVisible] = useState(false);

  const draggedItem = useRef(null);
  const dropTarget = useRef(null);

  const menuTree = useMemo(() => buildMenuTree(menus), [menus]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCreate = () => {
    setEditingMenu(null);
    toggleModal();
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    toggleModal();
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this menu item and all its children?"
      )
    ) {
      const idsToDelete = [id];
      const findChildren = (parentId) => {
        menus.forEach((menu) => {
          if (menu.parentId === parentId) {
            idsToDelete.push(menu.id);
            findChildren(menu.id);
          }
        });
      };
      findChildren(id);
      setMenus(menus.filter((menu) => !idsToDelete.includes(menu.id)));
    }
  };

  const handleSave = ({ title, link }) => {
    if (editingMenu) {
      setMenus(
        menus.map((m) => (m.id === editingMenu.id ? { ...m, title, link } : m))
      );
    } else {
      const topLevelItems = menus.filter((m) => m.parentId === null);
      const newItem = {
        id: uuidv4(),
        title,
        link,
        parentId: null,
        order: topLevelItems.length,
      };
      setMenus([...menus, newItem]);
    }
  };

  // --- Drag and Drop Handlers ---

  const clearDropIndicators = () => {
    document
      .querySelectorAll(
        ".menu-item-container, .submenu-drop-zone, #root-drop-zone"
      )
      .forEach((el) => {
        el.classList.remove(
          "drop-indicator-before",
          "drop-indicator-after",
          "drop-indicator-inside",
          "drop-indicator-root"
        );
      });
  };

  const onDragStart = (e, item) => {
    e.dataTransfer.effectAllowed = "move";
    draggedItem.current = item;
    e.currentTarget.classList.add("dragging");
    if (item.parentId) {
      setIsRootDropZoneVisible(true);
    }
  };

  const onDragEnd = () => {
    const draggingElement = document.querySelector(".menu-item.dragging");
    if (draggingElement) draggingElement.classList.remove("dragging");
    clearDropIndicators();
    setIsRootDropZoneVisible(false);

    if (!draggedItem.current || !dropTarget.current) return;

    const draggedId = draggedItem.current.id;
    const { id: targetId, position } = dropTarget.current;

    if (draggedId === targetId && position !== "root") return;

    setMenus((currentMenus) => {
      const isDroppingOnChild = (parentId, childId) => {
        const child = currentMenus.find((m) => m.id === childId);
        if (!child || !child.parentId) return false;
        if (child.parentId === parentId) return true;
        return isDroppingOnChild(parentId, child.parentId);
      };

      if (position === "inside" && isDroppingOnChild(draggedId, targetId)) {
        console.warn("Cannot move a parent into its own child.");
        return currentMenus;
      }

      let newMenus = JSON.parse(JSON.stringify(currentMenus));
      const draggedMenu = newMenus.find((m) => m.id === draggedId);
      const oldParentId = draggedMenu.parentId;
      let newParentId;

      // Step 1: Update parentId and temporarily set order for sorting
      if (position === "root") {
        draggedMenu.parentId = null;
        newParentId = null;
        draggedMenu.order = newMenus.filter((m) => m.parentId === null).length;
      } else if (position === "inside") {
        draggedMenu.parentId = targetId;
        newParentId = targetId;
        draggedMenu.order = newMenus.filter(
          (m) => m.parentId === targetId
        ).length;
      } else {
        const targetMenu = newMenus.find((m) => m.id === targetId);
        draggedMenu.parentId = targetMenu.parentId;
        newParentId = targetMenu.parentId;
        draggedMenu.order =
          targetMenu.order + (position === "after" ? 0.5 : -0.5);
      }

      // Step 2: Re-order all affected sibling groups
      const parentIdsToUpdate = new Set([oldParentId, newParentId]);
      parentIdsToUpdate.forEach((pid) => {
        newMenus
          .filter((m) => m.parentId === pid)
          .sort((a, b) => a.order - b.order)
          .forEach((item, index) => {
            item.order = index;
          });
      });

      return newMenus;
    });

    draggedItem.current = null;
    dropTarget.current = null;
  };

  const onDragOverItem = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();

    const targetElement = e.currentTarget;
    if (targetElement.querySelector(".dragging")) return;

    clearDropIndicators();
    const rect = targetElement.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;

    if (relativeY < rect.height / 2) {
      targetElement.classList.add("drop-indicator-before");
      dropTarget.current = { id: targetId, position: "before" };
    } else {
      targetElement.classList.add("drop-indicator-after");
      dropTarget.current = { id: targetId, position: "after" };
    }
  };

  const onDragOverSubmenuZone = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedItem.current?.id === targetId) return;

    clearDropIndicators();
    e.currentTarget.classList.add("drop-indicator-inside");
    dropTarget.current = { id: targetId, position: "inside" };
  };

  const onDragOverRootZone = (e) => {
    e.preventDefault();
    clearDropIndicators();
    e.currentTarget.classList.add("drop-indicator-root");
    dropTarget.current = { id: "root", position: "root" };
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <CardTitle tag="h4">Manage Header Menus</CardTitle>
                    <Button color="primary" onClick={handleCreate}>
                      <i className="mdi mdi-plus me-1"></i>
                      Create Menu
                    </Button>
                  </div>

                  {menuTree.length > 0 ? (
                    <MenuList
                      items={menuTree}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                      onDragOverItem={onDragOverItem}
                      onDragOverSubmenuZone={onDragOverSubmenuZone}
                      clearDropIndicators={clearDropIndicators}
                    />
                  ) : (
                    <div className="no-menus-placeholder">
                      <p>You haven't created any menus yet.</p>
                      <Button color="success" onClick={handleCreate}>
                        Create your first menu
                      </Button>
                    </div>
                  )}

                  <div
                    id="root-drop-zone"
                    className={isRootDropZoneVisible ? "visible" : ""}
                    onDragOver={onDragOverRootZone}
                    onDragLeave={clearDropIndicators}
                    onDrop={onDragEnd}
                  >
                    Drag here to make a main menu
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <MenuFormModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onSave={handleSave}
        menu={editingMenu}
      />
    </React.Fragment>
  );
};

export default HeaderMenuManager;

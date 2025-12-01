const asyncHandler = require("express-async-handler");
const { Menu } = require("../models/menu");
const { SubMenu } = require("../models/submenu");
const Provider = require("../models/provider");
const mongoose = require("mongoose");

//create a new menu
const createMenu = asyncHandler(async (req, res) => {
  try {
    const { title, url, icon, priority } = req.body;

    const duplicateMenu = await Menu.findOne({ title, url });

    if (duplicateMenu) {
      return res.status(400).json({ msg: "Menu already Created" });
    }

    if (!title && !icon) {
      return res.status(501).json({ msg: "All fields are required" });
    }

    const menu = new Menu({
      title: title,
      url: url,
      icon: icon,
      priority: priority,
      userId: req.provider.id,
    });
    await menu.save();
    res.status(201).json({ msg: "Menu Saved" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Create sub menu
const createSubMenu = asyncHandler(async (req, res) => {
  try {
    const { sub_title, sub_url, sub_priority, menuId } = req.body;

    const duplicateMenu = await SubMenu.findOne({ sub_title, sub_url });

    if (duplicateMenu) {
      return res.status(400).json({ msg: "Sub Menu Title already Created" });
    }

    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    if (!sub_title && !sub_url) {
      return res.status(501).json({ msg: "All fields are required" });
    }

    const subMenu = new SubMenu({
      sub_title,
      sub_url,
      sub_priority,
      parent: menuId,
      userId: req.provider.id,
    });
    await subMenu.save();
    await Menu.findByIdAndUpdate(menuId, { $push: { subMenu: subMenu._id } });
    res.status(201).json({ msg: "Sub menu saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//update menu
const updateMenu = asyncHandler(async (req, res) => {
  try {
    const { title, url, icon, priority, Status } = req.body;

    const menuExist = await Menu.findById(req.params.id);

    if (!menuExist) {
      return res.status(501).json({ msg: "Menu Not found" });
    }

    if (!title && !icon) {
      return res.status(501).json({ msg: "All fields are required" });
    }

    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      {
        title,
        url,
        icon,
        priority,
        Status,
      },
      { new: true, runValidators: true }
    );
    return res.status(201).json({ msg: "Menu Updated" });
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Id not found" });
    }
    res.status(500).json(error.message);
  }
});

// update sub menu
const updateSubMenu = asyncHandler(async (req, res) => {
  try {
    const { sub_title, sub_url, sub_priority, menuId } = req.body;

    const subMenuId = await SubMenu.findById(req.params.id);

    const parentId = subMenuId?.parent;

    if (!subMenuId) {
      return res.status(501).json({ msg: "Sub Menu Not found" });
    }

    const subMenu = await SubMenu.findByIdAndUpdate(
      req.params.id,
      {
        sub_title,
        sub_url,
        sub_priority,
        parent: menuId,
      },
      { new: true, runValidators: true }
    );

    if (menuId) {
      await Menu.findByIdAndUpdate(parentId, {
        $pull: { subMenu: subMenu._id },
      });
      await Menu.findByIdAndUpdate(menuId, { $push: { subMenu: subMenu._id } });
    }

    return res.status(200).json({ msg: "Sub Menu updated successfully" });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Id not found" });
    }
    res.status(500).json(error.message);
  }
});

//get menus
const getmenus = asyncHandler(async (req, res) => {
  try {
    const menus = await Menu.find()
      .populate({ path: "subMenu", options: { sort: { sub_priority: 1 } } })
      .populate("userId", ["name", "phone", "email"])
      .sort({ priority: 1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// get Sub menu
const getSubmenus = asyncHandler(async (req, res) => {
  try {
    const subMenus = await SubMenu.find()
      .populate({ path: "parent", options: { sort: { priority: 1 } } })
      .populate("userId", ["name", "phone", "email"])
      .sort({ sub_priority: 1 });
    res.status(200).json(subMenus);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//get menus by slug
const getMenuBySlug = asyncHandler(async (req, res) => {
  try {
    const menus = await Menu.findOne({ slug: req.params.slug })
      .populate("userId", ["name", "phone", "email"])
      .sort("-createdAt");
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Assign menu
const assignMenu = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { menus, submenus } = req.body;

    const providerExist = await Provider.findById(req.params.id);

    if (!providerExist) {
      return res.status(404).json({ msg: "Provider not found" });
    } else {
      const removeDuplicates = (array) => {
        return array.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      };

      menus.forEach((menu) => {
        if (!providerExist.menus.includes(menu)) {
          providerExist.menus.push(menu);
        }
      });

      submenus.forEach((submenu) => {
        if (!providerExist.submenus.includes(submenu)) {
          providerExist.submenus.push(submenu);
        }
      });

      providerExist.menus = removeDuplicates(providerExist.menus);
      providerExist.submenus = removeDuplicates(providerExist.submenus);

      await providerExist.save();
      return res.status(200).json({ msg: "Features Assigned" });
    }
  } catch (error) {
    console.log(error);

    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Provider Or Menu not found" });
    }
    res.status(500).json(error);
  }
});

//remove menu
const removeMenu = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { menus, submenus } = req.body;

    const providerExist = await Provider.findById(req.params.id);

    if (!providerExist) {
      return res.status(404).json({ msg: "Provider not found" });
    } else {
      const convertedMenus = [
        ...new Set(providerExist.menus.map((menu) => menu.toString())),
      ];
      const convertedSubmenus = [
        ...new Set(providerExist.submenus.map((submenu) => submenu.toString())),
      ];

      const filteredMenus = convertedMenus.filter(
        (menu) => !menus.includes(menu)
      );
      const filteredSubmenus = convertedSubmenus.filter(
        (submenu) => !submenus.includes(submenu)
      );

      providerExist.menus = filteredMenus;
      providerExist.submenus = filteredSubmenus;

      await providerExist.save();
      return res.status(200).json({ msg: "Feature Removed" });
    }
  } catch (error) {
    console.log(error);

    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "User Or Menu not found" });
    }
    res.status(500).json(error.message);
  }
});



module.exports = {
  createMenu,
  getmenus,
  getMenuBySlug,
  assignMenu,
  updateMenu,
  createSubMenu,
  updateSubMenu,
  getSubmenus,
  removeMenu,
};

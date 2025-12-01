const express = require("express");
const router = express.Router();
const {
    createAllowanceOption,
    updateAllowanceOption,
    getAllAllowanceOptions,
    getAllowanceOptionById,
    createAwardType,
    updateAwardType,
    getAllAwardTypes,
    getAwardTypeById,
    createBranch,
    updateBranch,
    getAllBranches,
    getBranchById,
    createContractype,
    updateContractype,
    getAllContractypes,
    getContractypeById,
    createDedication, 
    updateDedication,
    getAllDedications,
    getDedicationById,
    createDepartment,
    updateDepartment,
    getDepartmentById,
    createPerfomanceType,
    updatePerfomanceType,
    getAllPerfomanceType,
    getPerfomanceTypeById,
    createTerminationType,
    updateTerminationType,
    getTerminationTypeById,
    createTrainingType,
    updateTrainingType,
    getTrainingTypeById,
    createDocumentType,
    updateDocumentType,
    getDocumentTypeById,
    getAllTrainingTypes,
    getAllDepartments,
    createDesignation,
    updateDesignation,
    getAllDesignations,
    getDesignationById,
    getAllDocumentTypes,
    createExpenseType,
    updateExpenseType,
    getAllExpenseTypes,
    getExpenseTypeById,
    createGoal,
    updateGoal,
    getAllGoals,
    getGoalById,
    createIncomeType,
    updateIncomeType,
    getAllIncomeTypes,
    getIncomeTypeById,
    createJobCategory,
    updateJobCategory,
    getAllJobCategories,
    getJobCategoryById,
    createJobStage,
    updateJobStage,
    getAllJobStages,
    getJobStageById,
    createLeaveType,
    updateLeaveType,
    getAllLeaveTypes,
    getLeaveTypeById,
    createLoanOption,
    updateLoanOption,
    getAllLoanOptions,
    getLoanOptionById,
    createPaymentType,
    updatePaymentType,
    getAllPaymentTypes,
    getPaymentTypeById,
    createPaySlibType,
    updatePaySlibType,
    getAllPaySlibTypes,
    getPaySlibTypeById,
    getAllTerminationTypes,
    createCompanyPolicy,
    updateCompanyPolicy,
    getAllCompanyPolicies,
    getCompanyPolicyById
} = require("../controller/setup/hrmsetup");

const { providerAuth } = require("../middlewares/authMiddleware");

// POST
router.post("/", createAllowanceOption);
router.post("/", createAwardType);
router.post("/", createBranch);
router.post("/", createContractype);
router.post("/", createDedication);
router.post("/", createDepartment);
router.post("/", createPerfomanceType);
router.post("/", createTerminationType);
router.post("/", createTrainingType);
router.post("/", createDocumentType);
router.post("/", createDesignation);
router.post("/", createExpenseType);
router.post("/", createGoal);
router.post("/", createIncomeType);
router.post("/", createJobCategory);
router.post("/", createJobStage);
router.post("/", createLeaveType);
router.post("/", createLoanOption);
router.post("/", createPaymentType);
router.post("/", createPaySlibType);
router.post("/", createCompanyPolicy);


















// GET
router.get("/", providerAuth, getAllAllowanceOptions);
router.get("/", providerAuth, getAllAwardTypes);
router.get("/", providerAuth, getAllBranches);
router.get("/", providerAuth, getAllContractypes);
router.get("/", providerAuth, getAllDedications);
router.get("/", providerAuth, getAllPerfomanceType);
router.get("/", providerAuth, getAllTrainingTypes);
router.get("/", providerAuth, getAllDepartments);
router.get("/", providerAuth, getAllDesignations);
router.get("/", providerAuth, getAllDocumentTypes);
router.get("/", providerAuth, getAllExpenseTypes);
router.get("/", providerAuth, getAllGoals);
router.get("/", providerAuth, getAllIncomeTypes);
router.get("/", providerAuth, getAllJobCategories);
router.get("/", providerAuth, getAllJobStages);
router.get("/", providerAuth, getAllLeaveTypes);
router.get("/", providerAuth, getAllLoanOptions);
router.get("/", providerAuth, getAllPaymentTypes);
router.get("/", providerAuth, getAllPaySlibTypes);
router.get("/", providerAuth, getAllTerminationTypes);
router.get("/", providerAuth, getAllCompanyPolicies);

router.get("/:id", providerAuth, getAllowanceOptionById);
router.get("/:id", providerAuth, getAwardTypeById);
router.get("/:id", providerAuth, getBranchById);
router.get("/:id", providerAuth, getContractypeById);
router.get("/:id", providerAuth, getDedicationById);
router.get("/:id", providerAuth, getDepartmentById);
router.get("/:id", providerAuth, getPerfomanceTypeById);
router.get("/:id", providerAuth, getTerminationTypeById);
router.get("/:id", providerAuth, getTrainingTypeById);
router.get("/:id", providerAuth, getDocumentTypeById);
router.get("/:id", providerAuth, getDesignationById);
router.get("/:id", providerAuth, getExpenseTypeById);
router.get("/:id", providerAuth, getGoalById);
router.get("/:id", providerAuth, getIncomeTypeById);
router.get("/:id", providerAuth, getJobCategoryById);
router.get("/:id", providerAuth, getJobStageById);
router.get("/:id", providerAuth, getLeaveTypeById);
router.get("/:id", providerAuth, getLoanOptionById);
router.get("/:id", providerAuth, getPaymentTypeById);
router.get("/:id", providerAuth, getPaySlibTypeById);
router.get("/:id", providerAuth, getCompanyPolicyById);





//PUT
router.put("/:id", providerAuth,updateAllowanceOption);
router.put("/:id", providerAuth,updateAwardType);
router.put("/:id", providerAuth,updateBranch);
router.put("/:id", providerAuth,updateContractype);
router.put("/:id", providerAuth,updateDedication);
router.put("/:id", providerAuth,updateDepartment);
router.put("/:id", providerAuth,updatePerfomanceType);
router.put("/:id", providerAuth,updateTerminationType);
router.put("/:id", providerAuth,updateTrainingType);
router.put("/:id", providerAuth,updateDocumentType);
router.put("/:id", providerAuth,updateDesignation);
router.put("/:id", providerAuth,updateExpenseType);
router.put("/:id", providerAuth,updateGoal);
router.put("/:id", providerAuth,updateIncomeType);
router.put("/:id", providerAuth,updateJobCategory);
router.put("/:id", providerAuth,updateJobStage);
router.put("/:id", providerAuth,updateLeaveType);
router.put("/:id", providerAuth,updateLoanOption);
router.put("/:id", providerAuth,updatePaymentType);
router.put("/:id", providerAuth,updatePaySlibType);
router.put("/:id", providerAuth,updateCompanyPolicy);








//DELETE
// router.put("/item/delete/:id", deleteItem);

module.exports = router;

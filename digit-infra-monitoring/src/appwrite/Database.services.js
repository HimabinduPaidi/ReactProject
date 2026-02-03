// src/appwrite/Database.services.js
import { Databases, Query, ID } from "appwrite";
import client from "./index";

import {
  APPWRITE_DATABASE_ID,
  APPWRITE_STATES_ID,
  APPWRITE_DISTRICTS_ID,
  APPWRITE_ZONES_ID,
  APPWRITE_SCHOOLS_ID,
  APPWRITE_USER_REQUESTS_ID,
  APPWRITE_TECHNICIANS_ID,
  APPWRITE_ISSUES_ID,
} from "../utils/appwrite/constants";

class DatabaseService {
  constructor() {
    this.databases = new Databases(client);
  }

  // Your original helper – unchanged
  async _listDocuments(collectionId, queries = []) {
    try {
      const response = await this.databases.listDocuments(
        APPWRITE_DATABASE_ID,
        collectionId,
        queries
      );
      return response.documents;
    } catch (error) {
      console.error(`Error listing from ${collectionId}:`, error);
      return [];
    }
  }

  // Your original methods – all unchanged
  async getStates() {
    return this._listDocuments(APPWRITE_STATES_ID);
  }

  async getDistrictsByState(stateId) {
    return this._listDocuments(APPWRITE_DISTRICTS_ID, [
      Query.equal("states", stateId),
    ]);
  }

  async getZonesByDistrict(districtId) {
    return this._listDocuments(APPWRITE_ZONES_ID, [
      Query.equal("districts", districtId),
    ]);
  }

  async getSchoolsByZone(zoneId) {
    return this._listDocuments(APPWRITE_SCHOOLS_ID, [
      Query.equal("zones", zoneId),
    ]);
  }

  async createUserRequest(data) {
    try {
      return await this.databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_USER_REQUESTS_ID,
        ID.unique(),
        data
      );
    } catch (error) {
      console.error("Error creating user request:", error);
      throw new Error(error.message || "Failed to create request");
    }
  }

  async getStateAdmin(stateId) {
    const requests = await this._listDocuments(APPWRITE_USER_REQUESTS_ID, [
      Query.equal("requestedRole", "stateadmin"),
      Query.equal("status", "approved"),
      Query.equal("state", stateId),
    ]);
    return requests[0] || null;
  }

  async getDistrictAdmin(districtId) {
    const requests = await this._listDocuments(APPWRITE_USER_REQUESTS_ID, [
      Query.equal("requestedRole", "districtadmin"),
      Query.equal("status", "approved"),
      Query.equal("district", districtId),
    ]);
    return requests[0] || null;
  }

  async getStateAdminRequests() {
    return this._listDocuments(APPWRITE_USER_REQUESTS_ID, [
      Query.equal("requestedRole", "stateadmin"),
      Query.equal("status", "pending"),
    ]);
  }

  async getdistrictAdminRequests() {
    return this._listDocuments(APPWRITE_USER_REQUESTS_ID, [
      Query.equal("requestedRole", "districtadmin"),
      Query.equal("status", "pending"),
    ]);
  }

  async getTechnicianRequests() {
    return this._listDocuments(APPWRITE_USER_REQUESTS_ID, [
      Query.equal("requestedRole", "technician"),
      Query.equal("status", "pending"),
    ]);
  }

  async getschoolAdminRequests() {
    return this._listDocuments(APPWRITE_USER_REQUESTS_ID, [
      Query.equal("requestedRole", "schooladmin"),
      Query.equal("status", "pending"),
    ]);
  }

  // ────────────────────────────────────────────────
  // NEW METHODS – added for your dashboard flow
  // ────────────────────────────────────────────────

  async getTechniciansByDistrict(districtId) {
    return this._listDocuments(APPWRITE_TECHNICIANS_ID, [
      Query.equal("district", districtId), // or "districtId" – match your field name
    ]);
  }

  async getTechnicianByZone(zoneId) {
    return this._listDocuments(APPWRITE_TECHNICIANS_ID, [
      Query.equal("zone", zoneId), // or "zoneId" or "zonal_id" – match your field name
    ]);
  }

  async getSchoolsByTechnician(technicianId) {
    return this._listDocuments(APPWRITE_SCHOOLS_ID, [
      Query.equal("adminId", technicianId), // your schools table has adminId linking to technician
    ]);
  }

  async getIssuesBySchool(schoolId) {
    return this._listDocuments(APPWRITE_ISSUES_ID, [
      Query.equal("school", schoolId), // match your field name in issues table
      Query.orderDesc("$createdAt"),
    ]);
  }
}

export default new DatabaseService();
<template>
  <div class="space-y-6" v-if="asset">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/assets" class="p-2 hover:bg-muted rounded-full">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold">{{ asset.name }}</h1>
            <span class="px-3 py-1 text-sm rounded-full font-medium" :class="getStatusClass(asset.status)">
              {{ formatStatus(asset.status) }}
            </span>
          </div>
          <p class="text-muted-foreground">{{ asset.assetNumber }} • {{ asset.make }} {{ asset.model }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">
          <Icon name="lucide:qr-code" class="w-4 h-4" />
          QR Code
        </button>
        <button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
          @click="showTransferModal = true">
          <Icon name="lucide:arrow-right-left" class="w-4 h-4" />
          Transfer
        </button>
        <NuxtLink :to="`/admin/assets/${route.params.id}/edit`"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          <Icon name="lucide:pencil" class="w-4 h-4" />
          Edit
        </NuxtLink>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Summary Cards -->
        <div class="grid md:grid-cols-4 gap-4">
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Purchase Price</div>
            <div class="text-xl font-bold">₹{{ asset.purchasePrice?.toLocaleString() }}</div>
          </div>
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Current Value</div>
            <div class="text-xl font-bold text-green-600">₹{{ asset.currentValue?.toLocaleString() }}</div>
          </div>
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Depreciation/Yr</div>
            <div class="text-xl font-bold text-red-600">-₹{{ asset.annualDepreciation?.toLocaleString() }}</div>
          </div>
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Useful Life</div>
            <div class="text-xl font-bold">{{ asset.usefulLife }} yrs</div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="border-b border-border">
            <nav class="flex">
              <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
                class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"
                :class="activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'">
                {{ tab.label }}
              </button>
            </nav>
          </div>

          <div class="p-6">
            <!-- Details Tab -->
            <div v-if="activeTab === 'details'" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-3">General Information</h4>
                  <dl class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Category</dt>
                      <dd>{{ asset.category?.name }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Subcategory</dt>
                      <dd>{{ asset.subcategory }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Make</dt>
                      <dd>{{ asset.make }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Model</dt>
                      <dd>{{ asset.model }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Serial Number</dt>
                      <dd class="font-mono">{{ asset.serialNumber }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Condition</dt>
                      <dd class="capitalize">{{ asset.condition }}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 class="font-semibold mb-3">Purchase Information</h4>
                  <dl class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Purchase Date</dt>
                      <dd>{{ formatDate(asset.purchaseDate) }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Warranty Expiry</dt>
                      <dd :class="isWarrantyExpired ? 'text-red-600' : ''">{{ formatDate(asset.warrantyExpiry) }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-muted-foreground">Depreciation Method</dt>
                      <dd class="capitalize">{{ asset.depreciationMethod?.replace('_', ' ') }}</dd>
                    </div>
                    <div v-if="asset.vendor" class="flex justify-between">
                      <dt class="text-muted-foreground">Vendor</dt>
                      <dd>{{ asset.vendor.name }}</dd>
                    </div>
                    <div v-if="asset.po" class="flex justify-between">
                      <dt class="text-muted-foreground">Purchase Order</dt>
                      <dd>
                        <NuxtLink :to="`/admin/procurement/purchase-orders/${asset.poId}`"
                          class="text-primary hover:underline">
                          {{ asset.po.poNumber }}
                        </NuxtLink>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div v-if="asset.specifications">
                <h4 class="font-semibold mb-3">Specifications</h4>
                <div class="grid md:grid-cols-3 gap-4">
                  <div v-for="(value, key) in asset.specifications" :key="key" class="bg-muted/50 p-3 rounded-lg">
                    <div class="text-xs text-muted-foreground capitalize">{{ String(key).replace('_', ' ') }}</div>
                    <div class="font-medium">{{ value }}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-semibold mb-3">Description</h4>
                <p class="text-muted-foreground">{{ asset.description }}</p>
              </div>
            </div>

            <!-- Maintenance Tab -->
            <div v-if="activeTab === 'maintenance'" class="space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold">Maintenance History</h4>
                <button @click="showMaintenanceModal = true"
                  class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg">
                  Schedule Maintenance
                </button>
              </div>
              <div v-if="asset.maintenanceHistory?.length" class="space-y-3">
                <div v-for="(record, index) in asset.maintenanceHistory" :key="index"
                  class="p-4 bg-muted/50 rounded-lg">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-medium capitalize">{{ record.type }} Maintenance</div>
                    <span class="text-sm text-muted-foreground">{{ formatDate(record.date) }}</span>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ record.description }}</p>
                  <div class="flex justify-between text-sm mt-2">
                    <span>Performed by: {{ record.performedBy }}</span>
                    <span class="font-medium">Cost: ₹{{ record.cost?.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-muted-foreground">
                <Icon name="lucide:wrench" class="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No maintenance records</p>
              </div>
            </div>

            <!-- Transfers Tab -->
            <div v-if="activeTab === 'transfers'" class="space-y-4">
              <h4 class="font-semibold">Transfer History</h4>
              <div v-if="asset.transferHistory?.length" class="space-y-3">
                <div v-for="(transfer, index) in asset.transferHistory" :key="index" class="p-4 bg-muted/50 rounded-lg">
                  <div class="flex items-center gap-4 mb-2">
                    <span class="text-sm text-muted-foreground">{{ formatDate(transfer.date) }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="flex-1 text-right">
                      <div class="text-sm">{{ transfer.fromLocation || 'N/A' }}</div>
                      <div class="text-xs text-muted-foreground">{{ transfer.fromUser || 'Unassigned' }}</div>
                    </div>
                    <Icon name="lucide:arrow-right" class="w-5 h-5 text-primary" />
                    <div class="flex-1">
                      <div class="text-sm">{{ transfer.toLocation }}</div>
                      <div class="text-xs text-muted-foreground">{{ transfer.toUser || 'Unassigned' }}</div>
                    </div>
                  </div>
                  <div class="text-xs text-muted-foreground mt-2">Transferred by {{ transfer.transferredBy }}</div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-muted-foreground">
                <Icon name="lucide:arrow-right-left" class="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No transfer records</p>
              </div>
            </div>

            <!-- Audit Tab -->
            <div v-if="activeTab === 'audit'" class="space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold">Audit History</h4>
                <button @click="showAuditModal = true"
                  class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg">
                  Record Audit
                </button>
              </div>
              <div v-if="asset.auditHistory?.length" class="space-y-3">
                <div v-for="(audit, index) in asset.auditHistory" :key="index"
                  class="p-4 bg-muted/50 rounded-lg flex justify-between items-start">
                  <div>
                    <div class="font-medium capitalize">{{ audit.type?.replace('_', ' ') }}</div>
                    <div class="text-sm text-muted-foreground">{{ audit.notes }}</div>
                    <div class="text-xs text-muted-foreground mt-1">By {{ audit.verifiedBy }}</div>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-1 text-xs rounded-full font-medium"
                      :class="audit.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                      {{ audit.status }}
                    </span>
                    <div class="text-xs text-muted-foreground mt-1">{{ formatDate(audit.date) }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-muted-foreground">
                <Icon name="lucide:clipboard-check" class="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No audit records</p>
              </div>
            </div>

            <!-- Documents Tab -->
            <div v-if="activeTab === 'documents'" class="space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold">Documents</h4>
                <button @click="showUploadModal = true"
                  class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg">
                  Upload Document
                </button>
              </div>
              <div v-if="asset.documents?.length" class="grid md:grid-cols-2 gap-3">
                <div v-for="(doc, index) in asset.documents" :key="index"
                  class="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon name="lucide:file-text" class="w-8 h-8 text-muted-foreground" />
                    <div>
                      <div class="font-medium">{{ doc.name }}</div>
                      <div class="text-xs text-muted-foreground capitalize">{{ doc.type }} • {{
                        formatDate(doc.uploadedAt) }}</div>
                    </div>
                  </div>
                  <button class="p-2 hover:bg-muted rounded-lg">
                    <Icon name="lucide:download" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-8 text-muted-foreground">
                <Icon name="lucide:file-text" class="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No documents attached</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Location -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Location</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Icon name="lucide:building" class="w-5 h-5 text-muted-foreground" />
              <div>
                <div class="font-medium">{{ asset.property?.name }}</div>
                <div class="text-sm text-muted-foreground">{{ asset.property?.city }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="lucide:map-pin" class="w-5 h-5 text-muted-foreground" />
              <span>{{ asset.location }}</span>
            </div>
          </div>
        </div>

        <!-- Assignment -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Assigned To</h3>
          <div v-if="asset.assignedTo" class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="font-medium text-primary">{{ asset.assignedTo.firstName?.[0] }}{{
                asset.assignedTo.lastName?.[0] }}</span>
            </div>
            <div>
              <div class="font-medium">{{ asset.assignedTo.firstName }} {{ asset.assignedTo.lastName }}</div>
              <div class="text-sm text-muted-foreground">{{ asset.assignedTo.designation }}</div>
              <div class="text-xs text-muted-foreground">{{ asset.assignedTo.department }}</div>
            </div>
          </div>
          <div v-else class="text-center py-4 text-muted-foreground">
            <Icon name="lucide:user-x" class="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p class="text-sm">Not assigned</p>
            <button class="mt-2 text-sm text-primary hover:underline">Assign Asset</button>
          </div>
        </div>

        <!-- Warranty -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Warranty Status</h3>
          <div class="p-4 rounded-lg" :class="isWarrantyExpired ? 'bg-red-50' : 'bg-green-50'">
            <div class="flex items-center gap-2 mb-2">
              <Icon :name="isWarrantyExpired ? 'lucide:alert-triangle' : 'lucide:shield-check'" class="w-5 h-5"
                :class="isWarrantyExpired ? 'text-red-600' : 'text-green-600'" />
              <span class="font-medium" :class="isWarrantyExpired ? 'text-red-700' : 'text-green-700'">
                {{ isWarrantyExpired ? 'Expired' : 'Active' }}
              </span>
            </div>
            <div class="text-sm" :class="isWarrantyExpired ? 'text-red-600' : 'text-green-600'">
              {{ isWarrantyExpired ? 'Expired on' : 'Valid until' }} {{ formatDate(asset.warrantyExpiry) }}
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <button @click="showMaintenanceModal = true"
              class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-lg">
              <Icon name="lucide:wrench" class="w-4 h-4" />
              Schedule Maintenance
            </button>
            <button @click="showAuditModal = true"
              class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-lg">
              <Icon name="lucide:clipboard-check" class="w-4 h-4" />
              Record Audit
            </button>
            <button @click="showTransferModal = true"
              class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-lg">
              <Icon name="lucide:arrow-right-left" class="w-4 h-4" />
              Transfer Asset
            </button>
            <button @click="showDisposeModal = true"
              class="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
              <Icon name="lucide:trash-2" class="w-4 h-4" />
              Dispose Asset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transfer Modal -->
    <div v-if="showTransferModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showTransferModal = false">
      <div class="bg-card rounded-xl w-full max-w-lg m-4">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">Transfer Asset</h3>
          <button @click="showTransferModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="submitTransfer" class="p-6 space-y-4">
          <div>
            <label class="text-sm font-medium">New Location *</label>
            <select class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
              <option value="">Select location</option>
              <option>Floor 1, Desk 10</option>
              <option>Floor 2, Meeting Room A</option>
              <option>Floor 3, Desk 42</option>
              <option>IT Store Room</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Assign To</label>
            <select class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
              <option value="">Unassigned</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Mike Wilson</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Transfer Notes</label>
            <textarea rows="3" placeholder="Reason for transfer..."
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg resize-none"></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showTransferModal = false"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Transfer Asset
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Maintenance Modal -->
    <div v-if="showMaintenanceModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showMaintenanceModal = false">
      <div class="bg-card rounded-xl w-full max-w-lg m-4">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">Schedule Maintenance</h3>
          <button @click="showMaintenanceModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="submitMaintenance" class="p-6 space-y-4">
          <div>
            <label class="text-sm font-medium">Maintenance Type *</label>
            <select v-model="maintenanceForm.type"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" required>
              <option value="">Select type</option>
              <option value="preventive">Preventive</option>
              <option value="corrective">Corrective</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Scheduled Date *</label>
            <input v-model="maintenanceForm.date" type="date"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" required />
          </div>
          <div>
            <label class="text-sm font-medium">Description</label>
            <textarea v-model="maintenanceForm.description" rows="3" placeholder="Maintenance details..."
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg resize-none"></textarea>
          </div>
          <div>
            <label class="text-sm font-medium">Estimated Cost (₹)</label>
            <input v-model.number="maintenanceForm.cost" type="number"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showMaintenanceModal = false"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
            <button type="submit"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Schedule</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Audit Modal -->
    <div v-if="showAuditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showAuditModal = false">
      <div class="bg-card rounded-xl w-full max-w-lg m-4">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">Record Audit</h3>
          <button @click="showAuditModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="submitAudit" class="p-6 space-y-4">
          <div>
            <label class="text-sm font-medium">Audit Type *</label>
            <select v-model="auditForm.type" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"
              required>
              <option value="">Select type</option>
              <option value="physical_verification">Physical Verification</option>
              <option value="condition_check">Condition Check</option>
              <option value="inventory_count">Inventory Count</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Status *</label>
            <select v-model="auditForm.status"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" required>
              <option value="verified">Verified</option>
              <option value="discrepancy">Discrepancy Found</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Notes</label>
            <textarea v-model="auditForm.notes" rows="3" placeholder="Audit notes..."
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg resize-none"></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showAuditModal = false"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
            <button type="submit"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Record Audit</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Upload Document Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showUploadModal = false">
      <div class="bg-card rounded-xl w-full max-w-lg m-4">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">Upload Document</h3>
          <button @click="showUploadModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="submitUpload" class="p-6 space-y-4">
          <div>
            <label class="text-sm font-medium">Document Name *</label>
            <input v-model="uploadForm.name" type="text" placeholder="e.g., Purchase Invoice"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" required />
          </div>
          <div>
            <label class="text-sm font-medium">Document Type *</label>
            <select v-model="uploadForm.type"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" required>
              <option value="">Select type</option>
              <option value="invoice">Invoice</option>
              <option value="warranty">Warranty Card</option>
              <option value="manual">User Manual</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">File</label>
            <div class="mt-1 p-8 border-2 border-dashed border-border rounded-lg text-center">
              <Icon name="lucide:upload" class="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p class="text-sm text-muted-foreground">Drag and drop or click to upload</p>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showUploadModal = false"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
            <button type="submit"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Upload</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Dispose Asset Modal -->
    <div v-if="showDisposeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showDisposeModal = false">
      <div class="bg-card rounded-xl w-full max-w-lg m-4">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold text-red-600">Dispose Asset</h3>
          <button @click="showDisposeModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="submitDispose" class="p-6 space-y-4">
          <div class="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            <Icon name="lucide:alert-triangle" class="w-5 h-5 inline mr-2" />
            This action will permanently mark this asset as disposed and cannot be undone.
          </div>
          <div>
            <label class="text-sm font-medium">Disposal Method *</label>
            <select v-model="disposeForm.method"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" required>
              <option value="">Select method</option>
              <option value="sold">Sold</option>
              <option value="scrapped">Scrapped</option>
              <option value="donated">Donated</option>
              <option value="lost">Lost/Stolen</option>
            </select>
          </div>
          <div v-if="disposeForm.method === 'sold'">
            <label class="text-sm font-medium">Sale Amount (₹)</label>
            <input v-model.number="disposeForm.saleAmount" type="number"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
          </div>
          <div>
            <label class="text-sm font-medium">Reason for Disposal *</label>
            <textarea v-model="disposeForm.reason" rows="3" placeholder="Why is this asset being disposed?"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg resize-none"
              required></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showDisposeModal = false"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Dispose
              Asset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const route = useRoute()
const { data: asset } = await useFetch(`/api/assets/${route.params.id}`)

const activeTab = ref('details')
const showTransferModal = ref(false)
const showMaintenanceModal = ref(false)
const showAuditModal = ref(false)
const showUploadModal = ref(false)
const showDisposeModal = ref(false)

const tabs = [
  { key: 'details', label: 'Details' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'transfers', label: 'Transfers' },
  { key: 'audit', label: 'Audit' },
  { key: 'documents', label: 'Documents' },
]

const isWarrantyExpired = computed(() => {
  if (!asset.value?.warrantyExpiry) return true
  return new Date(asset.value.warrantyExpiry) < new Date()
})

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    in_use: 'bg-green-100 text-green-700',
    available: 'bg-blue-100 text-blue-700',
    under_maintenance: 'bg-amber-100 text-amber-700',
    disposed: 'bg-gray-100 text-gray-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => status?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'

const submitTransfer = () => {
  console.log('Transferring asset...')
  showTransferModal.value = false
  alert('Asset transferred! (Mock)')
}

// Form data for modals
const maintenanceForm = ref({
  type: '',
  date: '',
  description: '',
  cost: 0,
})

const auditForm = ref({
  type: '',
  status: 'verified',
  notes: '',
})

const uploadForm = ref({
  name: '',
  type: '',
})

const disposeForm = ref({
  method: '',
  saleAmount: 0,
  reason: '',
})

const submitMaintenance = () => {
  console.log('Scheduling maintenance:', maintenanceForm.value)
  showMaintenanceModal.value = false
  alert('Maintenance scheduled! (Mock)')
}

const submitAudit = () => {
  console.log('Recording audit:', auditForm.value)
  showAuditModal.value = false
  alert('Audit recorded! (Mock)')
}

const submitUpload = () => {
  console.log('Uploading document:', uploadForm.value)
  showUploadModal.value = false
  alert('Document uploaded! (Mock)')
}

const submitDispose = () => {
  console.log('Disposing asset:', disposeForm.value)
  showDisposeModal.value = false
  alert('Asset disposed! (Mock)')
}
</script>

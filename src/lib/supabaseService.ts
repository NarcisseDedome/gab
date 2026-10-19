import { supabase, isSupabaseConfigured } from './supabase';
import { User, KYCDocument, AuditLog, DailySiteReport, Contract, VerificationStatus, UserRole } from '@/types';

/**
 * Service de persistance Supabase pour GAB-work
 * Enregistre chaque donnée utilisateur dans la base de données PostgreSQL Supabase
 * Avec repli automatique transparent si les clés Supabase ne sont pas encore configurées en local.
 */

export const supabaseService = {
  // 1. Sauvegarder ou mettre à jour un utilisateur dans Supabase
  async saveUser(user: User): Promise<{ success: boolean; error?: any }> {
    if (!isSupabaseConfigured) {
      // Stockage local / mémoire si pas encore de clés Supabase actives
      return { success: true };
    }

    try {
      const { error } = await supabase.from('users').upsert({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        country: user.country,
        city: user.city,
        verified_status: user.verifiedStatus,
        bio: user.bio,
        trade: user.trade,
        company_name: user.companyName,
        registration_number: user.registrationNumber,
        experience_years: user.experienceYears,
        daily_rate_ghs: user.dailyRateGHS,
        availability_status: user.availabilityStatus,
        completion_rate: user.completionRate,
        address: user.address,
        updated_at: new Date().toISOString()
      });

      if (error) {
        console.warn('Supabase upsert user error:', error.message);
        return { success: false, error };
      }

      // Enregistrer également les documents KYC associés
      if (user.kycDocuments && user.kycDocuments.length > 0) {
        for (const doc of user.kycDocuments) {
          await this.saveKycDocument(user.id, doc);
        }
      }

      return { success: true };
    } catch (err) {
      console.error('Erreur saveUser Supabase:', err);
      return { success: false, error: err };
    }
  },

  // 2. Mettre à jour le statut et rôle d'un utilisateur par l'Admin
  async updateUserStatus(userId: string, verifiedStatus: VerificationStatus, role?: UserRole): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const updatePayload: any = {
        verified_status: verifiedStatus,
        updated_at: new Date().toISOString()
      };
      if (role) {
        updatePayload.role = role;
      }

      const { error } = await supabase.from('users').update(updatePayload).eq('id', userId);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('Erreur updateUserStatus Supabase:', err);
      return { success: false };
    }
  },

  // 3. Sauvegarder un document KYC dans Supabase
  async saveKycDocument(userId: string, doc: KYCDocument): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('kyc_documents').upsert({
        id: doc.id,
        user_id: userId,
        type: doc.type,
        name: doc.name,
        status: doc.status,
        file_url: doc.fileUrl || null,
        rejection_reason: doc.rejectionReason || null,
        uploaded_at: doc.uploadedAt
      });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('Erreur saveKycDocument Supabase:', err);
      return { success: false };
    }
  },

  // 4. Mettre à jour la validation d'un document KYC par l'Admin
  async updateKycDocumentStatus(docId: string, status: 'APPROVED' | 'REJECTED', rejectionReason?: string): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('kyc_documents').update({
        status,
        rejection_reason: rejectionReason || null,
        reviewed_at: new Date().toISOString()
      }).eq('id', docId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('Erreur updateKycDocumentStatus Supabase:', err);
      return { success: false };
    }
  },

  // 5. Enregistrer un journal d'audit de sécurité
  async logAuditEvent(log: AuditLog): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('audit_logs').insert({
        id: log.id,
        actor: log.actor,
        actor_role: log.actorRole,
        action: log.action,
        resource: log.resource,
        timestamp: log.timestamp,
        ip_address: log.ipAddress,
        details: log.details
      });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('Erreur logAuditEvent Supabase:', err);
      return { success: false };
    }
  },

  // 6. Sauvegarder un rapport de chantier journalier
  async saveSiteReport(report: DailySiteReport): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) return { success: true };

    try {
      const { error } = await supabase.from('daily_site_reports').insert({
        id: report.id,
        project_id: report.projectId,
        project_name: report.projectName,
        site_manager_name: report.siteManagerName,
        date: report.date,
        weather_condition: report.weatherCondition,
        workers_present: report.workersPresent,
        workers_absent: report.workersAbsent,
        progress_percent: report.progressPercent,
        summary: report.summary,
        issues_reported: report.issuesReported,
        photos: report.photos,
        verified_by_client: report.verifiedByClient
      });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('Erreur saveSiteReport Supabase:', err);
      return { success: false };
    }
  }
};

// JobsStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/constantStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Create Job Form Styles
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
  },
  inputLabel: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 16,
  },
  input: {
    color: Colors.text,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    color: Colors.text,
    padding: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 16,
  },
  picker: {
    color: Colors.text,
    height: 50,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Job Details Styles
  detailsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
    marginLeft: 4,
  },
  detailsHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  detailsSubtitle: {
    fontSize: 16,
    color: '#BBB',
    marginBottom: 4,
  },
  detailsDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 16,
    color: '#BBB',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
  },
  detailsStatusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#BBB',
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsLabel: {
    fontSize: 15,
    color: '#888',
  },
  detailsValue: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  applicantsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 24,
    marginBottom: 16,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 16,
  },
  applicationButton: {
    backgroundColor: Colors.primary,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applicationButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: Colors.text,
    fontSize: 14,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
});

export default styles;
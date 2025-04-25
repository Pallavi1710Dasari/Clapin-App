import { StyleSheet } from 'react-native';
import { Colors } from '../constants/constantStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(245, 216, 54, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  updateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
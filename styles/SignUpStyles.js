import { StyleSheet } from 'react-native';
import { Colors } from '../constants/constantStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Black background
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 40,
    paddingBottom: 60,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary, // Yellow title
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  formContainer: {
    marginBottom: 15,
  },
  termsText: {
    color: Colors.text,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: Colors.textBlack,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  linkText: {
    color: Colors.primary,
    fontWeight: 'bold',
  }
});
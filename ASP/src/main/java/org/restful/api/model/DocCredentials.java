package org.restful.api.model;

public class DocCredentials {
	private int doctorMemberId;
	private String password;
	private String encryptedPassword;
	private String successMessage;
	private String errMessage;

	public String getEncryptedPassword() {
		return encryptedPassword;
	}

	public void setEncryptedPassword(String encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
	}

	public int getDoctorMemberId() {
		return doctorMemberId;
	}

	public void setDoctorMemberId(int doctorMemberId) {
		this.doctorMemberId = doctorMemberId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSuccessMessage() {
		return successMessage;
	}

	public void setSuccessMessage(String successMessage) {
		this.successMessage = successMessage;
	}

	public String getErrorMessage() {
		return errMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errMessage = errorMessage;
	}

}

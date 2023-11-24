class LoanApplication:
    def _init_(self, name, income, credit_score, requested_amount):
        self.name = name
        self.income = income
        self.credit_score = credit_score
        self.requested_amount = requested_amount
        self.status = "Pending"
        self.approval_amount = 0

class LoanProcessor:
    def _init_(self):
        self.applications = []

    def apply_for_loan(self, application):
        self.applications.append(application)
        self.process_loan(application)

    def process_loan(self, application):
        if application.credit_score >= 700 and application.income >= 50000:
            application.status = "Approved"
            application.approval_amount = min(application.income * 0.3, application.requested_amount)
        else:
            application.status = "Rejected"

    def approve_loan(self, name):
        for application in self.applications:
            if application.name == name and application.status == "Pending":
                application.status = "Approved"
                application.approval_amount = min(application.income * 0.3, application.requested_amount)
                return f"Loan for {name} has been approved."

    def reject_loan(self, name):
        for application in self.applications:
            if application.name == name and application.status == "Pending":
                application.status = "Rejected"
                return f"Loan for {name} has been rejected."

    def list_applications(self):
        return [f"{app.name}: Status - {app.status}" for app in self.applications]

    def get_loan_status(self, name):
        for application in self.applications:
            if application.name == name:
                return f"Loan Status for {name}: {application.status} | Approved Amount: {application.approval_amount}"
        return f"No loan application found for {name}"

if _name_ == "_main_":
    loan_processor = LoanProcessor()

    # Sample loan applications
    application1 = LoanApplication("Alice", 60000, 720, 10000)
    application2 = LoanApplication("Bob", 45000, 680, 15000)
    application3 = LoanApplication("Charlie", 75000, 750, 20000)

    # Process loan applications
    loan_processor.apply_for_loan(application1)
    loan_processor.apply_for_loan(application2)
    loan_processor.apply_for_loan(application3)

    # Check loan status
    print(loan_processor.get_loan_status("Alice"))
    print(loan_processor.get_loan_status("Bob"))
    print(loan_processor.get_loan_status("Charlie"))

    # Approve and reject loans
    print(loan_processor.approve_loan("Alice"))
    print(loan_processor.reject_loan("Bob"))

    # List all applications
    print("All Loan Applications:")
    for application in loan_processor.list_applications():
        print(application)
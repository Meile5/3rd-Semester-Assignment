using DataAccess.Models;
using FluentValidation;

namespace Service.Validators;

public class CreateOrderValidator : AbstractValidator<CreateOrderDto>
{
    public CreateOrderValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotNull().WithMessage("Customer ID is required.");

        RuleFor(x => x.DeliveryDate)
            .NotNull().WithMessage("Delivery Date is required.");

        RuleFor(x => x.TotalAmount)
            .NotNull().WithMessage("Total Amount is required.");

        RuleFor(x => x.OrderEntries)
            .NotEmpty().WithMessage("At least one order entry is required.");
    }
    
   
}


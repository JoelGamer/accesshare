class GroupUserMailer < ApplicationMailer

  def group_invitation
    @user = params[:user]
    mail(to: @user.email, subject: 'Group invitation')
  end
end

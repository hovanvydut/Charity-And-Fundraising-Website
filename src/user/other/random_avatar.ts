export function randomAvatar() {
  const source = [
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420001/Charity_And_Fundraising/avatar/default/default-avatar-8_tzlnmq_czmz8c.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420001/Charity_And_Fundraising/avatar/default/default-avatar-10_iz0nfy_fkhudn.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420001/Charity_And_Fundraising/avatar/default/default-avatar-9_mwetwf_twqu1j.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420001/Charity_And_Fundraising/avatar/default/default-avatar-7_bptoqz_gn0hcj.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-3_dh1jvk_qawoat.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-6_hy6odx_q1awky.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-4_kvblgd_cd1cys.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-5_jvqma8_h1wksh.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-1_e8giie_ikuxxm.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593420000/Charity_And_Fundraising/avatar/default/default-avatar-2_poacpz_dqvof2.png',
  ];
  return source[Math.round(Math.random() * source.length)];
}

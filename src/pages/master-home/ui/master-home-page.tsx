import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { LanguageSwitcher } from '@/features/language-switcher';
import { useSessionStore } from '@/features/master-auth';
import { cn } from '@/shared/lib';

import {
  BrandMark,
  CampaignsIcon,
  ChevronIcon,
  ItemsIcon,
  MountainsIcon,
  NpcsIcon,
  OverviewIcon,
  PlusIcon,
  SettingsIcon,
  SpellsIcon,
} from './workshop-icons';

import styles from './master-home-page.module.css';

const ACTIVE_CAMPAIGNS = [
  {
    id: 'active-1',
    title: 'workshop.active1Title',
    meta: 'workshop.active1Meta',
    last: 'workshop.active1Last',
  },
  {
    id: 'active-2',
    title: 'workshop.active2Title',
    meta: 'workshop.active2Meta',
    last: 'workshop.active2Last',
  },
] as const;

const NPC_ROWS = [
  { id: 'npc-1', name: 'workshop.npc1', sub: 'workshop.npc1sub' },
  { id: 'npc-2', name: 'workshop.npc2', sub: 'workshop.npc2sub' },
  { id: 'npc-3', name: 'workshop.npcPh', sub: 'workshop.npcPhSub' },
  { id: 'npc-4', name: 'workshop.npcPh', sub: 'workshop.npcPhSub' },
  { id: 'npc-5', name: 'workshop.npcPh', sub: 'workshop.npcPhSub' },
] as const;

const ITEM_ROWS = [
  { id: 'item-1', name: 'workshop.item1', sub: 'workshop.item1sub' },
  { id: 'item-2', name: 'workshop.item2', sub: 'workshop.item2sub' },
  { id: 'item-3', name: 'workshop.itemPh', sub: 'workshop.itemPhSub' },
  { id: 'item-4', name: 'workshop.itemPh', sub: 'workshop.itemPhSub' },
  { id: 'item-5', name: 'workshop.itemPh', sub: 'workshop.itemPhSub' },
] as const;

const SPELL_ROWS = [
  { id: 'spell-1', name: 'workshop.spell1', sub: 'workshop.spell1sub' },
  { id: 'spell-2', name: 'workshop.spell2', sub: 'workshop.spell2sub' },
  { id: 'spell-3', name: 'workshop.spellPh', sub: 'workshop.spellPhSub' },
  { id: 'spell-4', name: 'workshop.spellPh', sub: 'workshop.spellPhSub' },
  { id: 'spell-5', name: 'workshop.spellPh', sub: 'workshop.spellPhSub' },
] as const;

const LIBRARY = [
  { id: 'npcs', title: 'workshop.npcs', to: '/master/npcs', rows: NPC_ROWS },
  { id: 'items', title: 'workshop.items', to: '/master/items', rows: ITEM_ROWS },
  { id: 'spells', title: 'workshop.spells', to: '/master/spells', rows: SPELL_ROWS },
] as const;

const MINE = [
  {
    id: 'mine-1',
    title: 'workshop.active1Title',
    status: 'active',
    players: 'workshop.players5',
    level: 'workshop.lvl3',
  },
  {
    id: 'mine-2',
    title: 'workshop.mine2',
    status: 'active',
    players: 'workshop.players4',
    level: 'workshop.lvl1',
  },
  {
    id: 'mine-3',
    title: 'workshop.mine3',
    status: 'draft',
    players: 'workshop.players35',
    level: 'workshop.lvl5',
  },
  {
    id: 'mine-4',
    title: 'workshop.mine4',
    status: 'done',
    players: 'workshop.players4',
    level: 'workshop.lvl1',
  },
] as const;

const STATUS_KEY = {
  active: 'workshop.statusActive',
  draft: 'workshop.statusDraft',
  done: 'workshop.statusDone',
} as const;

const NAV_LINKS = [
  { to: '/company', label: 'workshop.campaigns', Icon: CampaignsIcon },
  { to: '/master/npcs', label: 'workshop.npcs', Icon: NpcsIcon },
  { to: '/master/items', label: 'workshop.items', Icon: ItemsIcon },
  { to: '/master/spells', label: 'workshop.spells', Icon: SpellsIcon },
] as const;

const SIDE_CAMPAIGNS = ['workshop.active1Title', 'workshop.active2Title'] as const;

export function MasterHomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signOut = useSessionStore((state) => state.signOut);
  const activeTitleId = useId();
  const mineTitleId = useId();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <Link className={styles.brand} to="/">
          <BrandMark />
          <span className={styles.brandName}>{t('workshop.brand')}</span>
        </Link>

        <nav className={styles.nav} aria-label={t('workshop.nav')}>
          <Link className={styles.navCurrent} to="/master" aria-current="page">
            <OverviewIcon className={styles.navIcon} />
            {t('workshop.overview')}
          </Link>

          <p className={styles.groupLabel}>{t('workshop.activeGroup')}</p>
          {SIDE_CAMPAIGNS.map((title) => (
            <button key={title} type="button" className={styles.navItem}>
              <span className={styles.campaignMark} aria-hidden="true" />
              {t(title)}
            </button>
          ))}
          <div className={styles.divider} />

          {NAV_LINKS.map(({ to, label, Icon }) => (
            <Link key={to} className={styles.navItem} to={to}>
              <Icon className={styles.navIcon} />
              {t(label)}
            </Link>
          ))}
        </nav>

        <div className={styles.user}>
          <span className={styles.avatar} aria-hidden="true">
            {t('workshop.avatarLetter')}
          </span>
          <div className={styles.userText}>
            <p className={styles.userName}>{t('workshop.masterName')}</p>
            <button type="button" className={styles.signOut} onClick={handleSignOut}>
              {t('workshop.signOut')}
            </button>
          </div>
          <div className={styles.lang}>
            <LanguageSwitcher placement="inline" />
          </div>
          <button type="button" className={styles.settings} aria-label={t('workshop.settings')}>
            <SettingsIcon />
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>{t('workshop.greeting')}</h1>
            <p className={styles.stats}>{t('workshop.stats')}</p>
          </div>
          <button type="button" className={styles.create}>
            {t('workshop.create')}
            <ChevronIcon />
          </button>
        </header>

        <section className={styles.section} aria-labelledby={activeTitleId}>
          <div className={styles.sectionHead}>
            <h2 id={activeTitleId} className={styles.sectionTitle}>
              {t('workshop.activeGroup')}
            </h2>
            <Link className={styles.allLink} to="/company">
              {t('workshop.allCampaigns')}
            </Link>
          </div>
          <div className={styles.activeGrid}>
            {ACTIVE_CAMPAIGNS.map((campaign) => (
              <article key={campaign.id} className={styles.activeCard}>
                <div className={styles.cover} aria-hidden="true">
                  <MountainsIcon />
                </div>
                <div className={styles.activeBody}>
                  <h3 className={styles.activeTitle}>{t(campaign.title)}</h3>
                  <p className={styles.meta}>{t(campaign.meta)}</p>
                  <p className={styles.meta}>{t(campaign.last)}</p>
                  <button type="button" className={styles.continue}>
                    {t('workshop.continue')}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.library} aria-label={t('workshop.library')}>
          {LIBRARY.map((column) => (
            <article key={column.id} className={styles.libCard}>
              <div className={styles.libHead}>
                <h2 className={styles.libTitle}>{t(column.title)}</h2>
                <Link className={styles.allLink} to={column.to}>
                  {t('workshop.all')}
                </Link>
              </div>
              {column.rows.map((row) => (
                <Link key={row.id} className={styles.row} to={column.to}>
                  <span className={styles.thumb} aria-hidden="true" />
                  <span className={styles.rowText}>
                    <span className={styles.rowName}>{t(row.name)}</span>
                    <span className={styles.rowSub}>{t(row.sub)}</span>
                  </span>
                </Link>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.section} aria-labelledby={mineTitleId}>
          <h2 id={mineTitleId} className={styles.sectionTitle}>
            {t('workshop.mineTitle')}
          </h2>
          <div className={styles.mineGrid}>
            {MINE.map((campaign) => (
              <button key={campaign.id} type="button" className={styles.mineCard}>
                <span className={styles.mineCover} aria-hidden="true" />
                <span className={styles.mineBody}>
                  <span className={styles.mineTitle}>{t(campaign.title)}</span>
                  <span className={styles.chips}>
                    <span className={cn(styles.chip, styles[campaign.status])}>
                      {t(STATUS_KEY[campaign.status])}
                    </span>
                    <span className={styles.chip}>{t(campaign.players)}</span>
                    <span className={styles.chip}>{t(campaign.level)}</span>
                  </span>
                </span>
              </button>
            ))}
            <button type="button" className={styles.newCampaign}>
              <PlusIcon />
              {t('workshop.newCampaign')}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
